import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection, getConnection, getRepository } from 'typeorm';
import cors from 'cors';

import { User } from './entity/User';
import { Post } from './entity/Post';

import { typeOrmConfig } from '../ormConfig';
import { ResolverMap } from 'ResolverType';

// The GraphQL schema
const typeDefs = gql`
	type User {
		id: ID!
		firstName: String!
		photo: [Post!]!
	}

	# TODO: Finish User - Post Relations
	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		userId: User!
	}

	type Query {
		user(id: ID!): User!
		users: [User!]!
	}

	type Mutation {
		createUser(firstName: String!, post: CreatePostInput): User!
		updateUser(id: ID!, firstName: String): Boolean
		deleteUser(id: ID!): Boolean
	}

	input CreatePostInput {
		title: String!
		body: String!
		published: Boolean!
		author: ID!
	}
`;

// A map of functions which return data for the schema.
const resolvers: ResolverMap = {
	Query: {
		user: async (_, { id }) => {
			// const user = await User.findOne(id, { relations: ['post'] });
			const user = await getRepository(User).findOne(id, { relations: ['post'] });
			console.log(user);

			return user;
		},
		users: async () => {
			const users = await User.find({ relations: ['post'] });

			console.log(users);
			return users;
		},
	},
	Mutation: {
		createUser: async (_, args) => {
			const post = Post.create({ ...args.post });
			await post.save();

			const user = User.create({
				firstName: args.firstName,
			});

			user.posts.push(post);

			await user.save();

			console.log(user);

			return user;
		},
		updateUser: async (_, { id, ...args }) => {
			try {
				await User.update(id, args);
			} catch (err) {
				console.log(err);
				return false;
			}

			return true;
		},
		deleteUser: async (_, { id }, ctx, info) => {
			try {
				// await User.remove(id);
				await getConnection()
					.createQueryBuilder()
					.delete()
					.from(User)
					.where('id = :id', { id })
					.execute();
			} catch (err) {
				console.log(err);
				return false;
			}

			return true;
		},
	},
};

(async (): Promise<void> => {
	// INFO: Here you can setup and run express/koa/any other framework

	const app = express();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: {},
	});

	try {
		await createConnection(typeOrmConfig);
	} catch (err) {
		throw new Error(err);
	}

	// INFO: Add routes|middleware here for http requests in sequence order: middleware then routes
	// app.use('/auth' | cors | routes, cb(..args))

	// CORS is needed to perform HTTP requests from another domain than your server domain to your server.
	// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.
	app.use(cors()); // cors for http routes

	// Using Apollo Server’s applyMiddleware() method, you can opt-in any middleware, which in this case is Express
	// INFO: What this does is it creates a bunch of middleware for express app under the hood
	server.applyMiddleware({
		app, // app is from an existing express app
		path: '/graphql',
		// cors for that '/graphql' route|path
		cors: {
			credentials: true,
			origin: 'http://localhost:4000',
		},
	});

	app.listen({ port: 4000 }, (): void => {
		console.log('🚀  Server ready at http://localhost:4000' + server.graphqlPath);
	});
})().catch(err => console.log(err));
