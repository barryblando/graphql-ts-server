export type Resolver = (parent: any, args: any, context: any, info: any) => any

// Use this interface if using schema-first graphql
export interface IResolverMap {
	[key: string]: {
		[key: string]: Resolver
	}
}
