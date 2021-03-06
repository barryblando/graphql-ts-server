import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { v4 as uuid } from 'uuid'
import { User } from '../../entity/User'
import { IContext } from '../../types/MyContext'
import { redis } from '../../redis'
import { sendEmail } from '../../utils/sendEmail'
import { forgotPasswordPrefix } from '../../constants'

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(@Arg('email') email: string, @Ctx() ctx: IContext): Promise<boolean> {
		const user = await User.findOne({ where: { email } })
		if (!user) throw new Error("Email address doesn't exist")

		const token = uuid()
		// INFO: set redis key:value pair, value is going to be the person who will need to confirm
		await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24) // 1 day expiration

		// URL will redirect back to frontend, frontend will call a mutation
		await sendEmail(email, `http://localhost:3000/user/change-password/${token}`)

		return true
	}
}
