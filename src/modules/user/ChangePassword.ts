import { sendRefreshToken } from '../../utils/sendRefreshToken'
import { createAccessToken, createRefreshToken } from './../../utils/authToken'
import { getConnection } from 'typeorm'
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { forgotPasswordPrefix } from '../../constants'
import { ChangePasswordInput } from './changePassword/ChangePasswordInput'
import { IContext } from '../../types/MyContext'
import { UserResponse } from '../../graphql-types/UserResponse'

@Resolver()
export class ChangePasswordResolver {
	@Mutation(() => UserResponse)
	async changePassword(
		@Arg('data') { token, password }: ChangePasswordInput,
		@Ctx() { res }: IContext,
	): Promise<UserResponse> {
		// get the user id from redis
		const userId = await redis.get(forgotPasswordPrefix + token)

		if (!userId) {
			return {
				errors: [
					{
						path: 'Change Password',
						message: 'Token is invalid.',
					},
				],
			}
		}

		const user = await User.findOne(userId)

		if (!user) {
			return {
				errors: [
					{
						path: 'Change Password',
						message: 'User not found.',
					},
				],
			}
		}

		// delete forgot password confirmation
		await redis.del(forgotPasswordPrefix + token)

		// update user password
		await User.update({ id: parseInt(userId) }, { password })

		// login automatically the user
		// ctx.req.session.userId = user.id - session

		// increment token version, so current refresh token will be invalidated
		// whenever '/refresh-token' route called it won't generate new access token to current logged-in devices
		await getConnection()
			.getRepository(User)
			.increment({ id: parseInt(userId) }, 'tokenVersion', 1)

		// create and send new refresh token
		sendRefreshToken(res, createRefreshToken(user))

		// send new access token, so it will login automatically in the front-end
		return { user, accessToken: createAccessToken(user) }
	}
}
