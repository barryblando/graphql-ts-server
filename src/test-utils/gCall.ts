import { createSchema } from './../utils/createSchema'
import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql'

interface Options {
	// query, mutation, subscription
	source: string
	// graphql data arguments
	variableValues?: Maybe<{
		[key: string]: any
	}>
	accessToken?: string
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, accessToken }: Options) => {
	if (!schema) {
		// INFO: In order to test the query, mutation resolvers from type-graphql
		// we need to create separate graphql schema and make separate graphql calls
		schema = await createSchema()
	}

	return await graphql({
		schema,
		source,
		variableValues,
		// here we can provide context values when calling graphql
		contextValue: {
			req: {
				headers: {
					authorization: 'bearer ' + accessToken,
				},
			},
			res: {
				clearCookie: jest.fn(),
			},
		},
	})
}
