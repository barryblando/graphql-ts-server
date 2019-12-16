import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'
import { redis } from '../../redis'
import { confirmUserPrefix } from '../../constants'

@Resolver()
export class ConfirmUserResolver {
	@Mutation(returns => Boolean)
	async confirmUser(@Arg('token') token: string, @Ctx() ctx: MyContext): Promise<boolean> {
		const userId = await redis.get(confirmUserPrefix + token) // get the value userId

		if (!userId) return false

		await User.update({ id: userId }, { confirmed: true })

		await redis.del(confirmUserPrefix + token)

		return true
	}
}
