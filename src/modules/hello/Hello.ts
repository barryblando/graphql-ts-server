import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloResolver {
	@Query(returns => String)
	hello() {
		return 'Hello World!'
	}
}
