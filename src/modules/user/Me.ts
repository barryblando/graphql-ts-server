import { isAuth } from '../middleware/isAuth'
import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { IContext } from '../../types/MyContext'

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true, complexity: 2 })
	@UseMiddleware(isAuth)
	async me(@Ctx() { payload }: IContext): Promise<User> {
		// if (!ctx.req.session.userId) {

		const user = await User.findOne({ where: { id: payload.userId } })

		return user!
	}
}
