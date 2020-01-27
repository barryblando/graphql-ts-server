import { AuthenticationError } from 'apollo-server-express'
import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { MyContext } from '../../types/MyContext'

// INFO: Here we create own middleware instead of using global authChecker provided in buildSchema
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	const authorization = context.req.headers['authorization'] // bearer token

	if (!authorization) {
		throw new AuthenticationError('Not authenticated')
	}

	try {
		const token = authorization.split(' ')[1]
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) // decoded Token
		context.payload = payload as { userId: number } // store userId in context payload
	} catch (err) {
		const error = new Error()
		error.name = err.name
		error.message = 'Not authenticated'
		error.stack = new AuthenticationError(err.message).stack
		return error
	}

	// #region - uncomment if using session
	// if (!context.req.session.userId) {
	// throw new AuthenticationError('not authenticated')
	// }
	// #endregion

	return next()
}
