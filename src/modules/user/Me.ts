import { isAuth } from '../middleware/isAuth'
import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class MeResolver {
	@Query(returns => User, { nullable: true, complexity: 5 })
	@UseMiddleware(isAuth)
	async me(@Ctx() { payload }: MyContext): Promise<User> {
		// if (!ctx.req.session.userId) {

		const user = await User.findOne({ where: { id: payload.userId } })
		return user
	}
}
