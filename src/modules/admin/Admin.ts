import { PaginatedUserResponse } from '../../graphql-types/PaginatedUserResponse'
import { isAuth } from './../middleware/isAuth'
import { Resolver, Query, UseMiddleware, Mutation, Arg, Authorized } from 'type-graphql'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm'

@Resolver()
export class AdminResolver {
	@Query(returns => PaginatedUserResponse, { nullable: true })
	@UseMiddleware(isAuth)
	@Authorized('ADMIN')
	async users(@Arg('page', () => Number, { nullable: true }) page = 1): Promise<PaginatedUserResponse> {
		// https://github.com/typeorm/typeorm/blob/master/sample/sample7-pagination/app.ts
		const [results, total] = await User.findAndCount({ order: { createdAt: 'DESC' }, take: 2, skip: (page - 1) * 2 })
		return {
			results,
			total,
		}
	}

	@Mutation(returns => Boolean)
	async revokeRefreshTokenForUser(@Arg('userId') userId: string) {
		await getConnection()
			.getRepository(User)
			.increment({ id: parseInt(userId) }, 'tokenVersion', 1)
		return true
	}
}
