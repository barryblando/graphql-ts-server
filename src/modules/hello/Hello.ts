import { Resolver, Query, UseMiddleware } from 'type-graphql'
import { isAuth } from '../middleware/isAuth'

@Resolver()
export class HelloResolver {
	@Query(returns => String)
	@UseMiddleware(isAuth)
	hello() {
		return 'Hello World!'
	}
}
