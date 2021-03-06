import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { IContext } from '../../types/MyContext'
import { LoginResponse } from '../../graphql-types/LoginResponse'
import { createAccessToken, createRefreshToken } from '../../utils/authToken'
import { sendRefreshToken } from '../../utils/sendRefreshToken'

@Resolver()
export class LoginResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { res }: IContext,
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return {
				errors: [
					{
						path: 'Email',
						message: 'User not found with the email address you provided.',
					},
				],
			}
		}

		const valid = await user.comparePassword(password, user.password)

		if (!valid) {
			return {
				errors: [
					{
						path: 'Password',
						message: 'Your password is invalid, please try again.',
					},
				],
			}
		}

		if (!user.confirmed) {
			return {
				errors: [
					{
						path: 'Confirmation',
						message: 'User not confirmed.',
					},
				],
			}
		}

		// #region - uncomment if you wanna use session
		// add userId to session object & this session id will be stored in Redis and its going to persist that
		// ctx.req.session.userId = user.id
		// no need session.save() - useful to call this method (i.e redirects, long-lived request or in websocket)
		// #endregion

		// login successful - create and send refresh token

		sendRefreshToken(res, createRefreshToken(user))

		return {
			accessToken: createAccessToken(user),
			user,
		}
	}
}
