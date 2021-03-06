import { PaginatedUserResponse } from '../../graphql-types/PaginatedUserResponse'
// import { isAuth } from './../middleware/isAuth'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm'

@Resolver()
export class AdminResolver {
	// @Query(returns => PaginatedUserResponse, { nullable: true })
	// @UseMiddleware(isAuth)
	// @Authorized('ADMIN')
	// async users(@Arg('page', () => Number, { nullable: true }) page = 1): Promise<PaginatedUserResponse> {
	// 	// https://stackoverflow.com/questions/53922503/how-to-implement-pagination-in-nestjs-with-typeorm
	// 	const [results, total] = await User.findAndCount({ order: { createdAt: 'DESC' }, take: 2, skip: (page - 1) * 2 })
	// 	return {
	// 		results,
	// 		total,
	// 	}
	//

	@Query(() => PaginatedUserResponse, { nullable: true })
	async users(@Arg('page', () => Number, { nullable: true }) page = 1): Promise<PaginatedUserResponse> {
		// https://stackoverflow.com/questions/53922503/how-to-implement-pagination-in-nestjs-with-typeorm
		const [results, total] = await User.findAndCount({ order: { createdAt: 'DESC' }, take: 2, skip: (page - 1) * 2 })
		return {
			results,
			total,
		}
	}

	@Mutation(() => Boolean)
	async revokeRefreshTokenForUser(@Arg('userId') userId: string) {
		await getConnection()
			.getRepository(User)
			.increment({ id: parseInt(userId) }, 'tokenVersion', 1)
		return true
	}
}
