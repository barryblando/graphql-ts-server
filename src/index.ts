import 'reflect-metadata'
import { createSchema } from './utils/createSchema'
import { createAccessToken, createRefreshToken } from './utils/authToken'
import { verify } from 'jsonwebtoken'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { getComplexity, simpleEstimator, fieldExtensionsEstimator } from 'graphql-query-complexity'

// import session from 'express-session'
// import connectRedis from 'connect-redis'
// import { redis } from './redis'

import { typeOrmConfig } from './ormconfig'
import { User } from './entity/User'
import { sendRefreshToken } from './utils/sendRefreshToken'
import { separateOperations } from 'graphql'

const startServer = async (): Promise<void> => {
	// INFO: Here you can setup and run express/koa/any other framework
	const app = express()
	// const RedisStore = connectRedis(session)

	// INFO: Add routes|middleware here for http requests in sequence order: middleware then graphql resolver / routes
	// app.use('/auth' | cors | routes, cb(..args))

	// CORS is needed to perform HTTP requests from another domain than your server domain to your server.
	// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.

	// NOTE: // Additional middleware can be mounted at this point to run before getting into resolvers.
	app.use(
		cors({
			credentials: true,
			origin: process.env.FRONTEND_URL,
		}),
	)

	// #region Session Middleware - Uncomment this if you want to use session for authentication
	// app.use(
	// 	session({
	// 		store: new RedisStore({
	// 			client: redis,
	// 		}),
	// 		name: 'qid',
	// 		secret: process.env.SESSION_SECRET || 'ww2wde1q2321',
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		cookie: {
	// 			httpOnly: true,
	// 			secure: process.env.NODE_ENV === 'production', // https
	// 			maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
	// 		},
	// 	}),
	// )
	// #endregion

	app.use('/refresh_token', cookieParser()) // so it only runs on refresh_token route that need it

	// Handle refresh token
	app.post('/refresh_token', async (req, res) => {
		// get refresh token stored in a cookie called jid
		const token = req.cookies.jid

		if (!token) {
			// don't send back access token
			return res.send({ ok: false, accessToken: '' })
		}

		let payload: any = null
		try {
			// make sure refresh token is still valid, otherwise revoke refresh token (when user change his/her password)
			payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
		} catch (err) {
			console.log({ error: err.name, message: err.message })
			return res.send({ ok: false, accessToken: '' })
		}

		// token is valid and we can send back an access token
		const user = await User.findOne({ where: { id: payload.userId } })

		// if can't find user
		if (!user) {
			return res.send({ ok: false, accessToken: '' })
		}

		// if token version change
		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: '' })
		}

		// if all is well, renew refresh token too
		sendRefreshToken(res, createRefreshToken(user))

		return res.send({ ok: true, accessToken: createAccessToken(user) })
	})

	try {
		await createConnection(typeOrmConfig)
	} catch (err) {
		throw new Error(err)
	}

	const schema = await createSchema()

	const server = new ApolloServer({
		schema,
		// A graph APIs context is an object that's shared among every resolver in a GraphQL request
		context: ({ req, res }) => ({
			// this is the req and res from express, we can access these in the resolvers when using sessions / jwt
			req,
			res,
			// you can add also data loaders, pubsub, etc. along with req & res
		}),
		// dataSources: {}, // external rest apis, https://www.apollographql.com/docs/tutorial/data-source/
		// Create a plugin that will allow for query complexity calculation for every request
		plugins: [
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						/**
						 * This provides GraphQL query analysis to be able to react on complex queries to your GraphQL server.
						 * This can be used to protect your GraphQL servers against resource exhaustion and DoS attacks.
						 * More documentation can be found at https://github.com/ivome/graphql-query-complexity.
						 */
						const complexity = getComplexity({
							// Our built schema
							schema,
							// To calculate query complexity properly,
							// we have to check if the document contains multiple operations
							// and eventually extract it operation from the whole query document.
							query: request.operationName ? separateOperations(document)[request.operationName] : document,
							// The variables for our GraphQL query
							variables: {},
							// Add any number of estimators. The estimators are invoked in order, the first
							// numeric value that is being returned by an estimator is used as the field complexity.
							// If no estimator returns a value, an exception is raised.
							estimators: [
								// Using fieldExtensionsEstimator is mandatory to make it work with type-graphql.
								fieldExtensionsEstimator(),
								// Add more estimators here...
								// This will assign each field a complexity of 1
								// if no other estimator returned a value.
								simpleEstimator({ defaultComplexity: 1 }),
							],
						})
						// Here we can react to the calculated complexity,
						// like compare it with max and throw error when the threshold is reached.
						if (complexity >= 20) {
							throw new Error(
								`Sorry, too complicated query! ${complexity} is over 8 that is the max allowed complexity.`,
							)
						}
						// And here we can e.g. subtract the complexity point from hourly API calls limit.
						console.log('Used query complexity points:', complexity)
					},
				}),
			},
		],
	})

	// Using Apollo Server’s applyMiddleware() method, you can opt-in any middleware, which in this case is Express
	// INFO: What this does is it creates a bunch of middleware for express app under the hood;
	server.applyMiddleware({
		app, // app is from an existing express app
		path: '/graphql',
	})

	app.listen(process.env.PORT || 4000, (): void => {
		console.log('🚀  Server ready at http://localhost:4000' + server.graphqlPath)
	})
}

startServer().catch(err => console.log(err))
