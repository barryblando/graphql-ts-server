import { Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql'
import { IContext } from '../../types/MyContext'
import { isAuth } from '../middleware/isAuth'
import { sendRefreshToken } from '../../utils/sendRefreshToken'

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async logout(@Ctx() { res }: IContext): Promise<boolean> {
		// return new Promise((resolve, reject) =>
		// 	ctx.req.session.destroy(err => {
		// 		if (err) {
		// 			console.log(err)
		// 			return reject(false)
		// 		}
		//
		// 		ctx.res.clearCookie('jid') // clear cookie
		// 		return resolve(true)
		// 	}),
		// )
		sendRefreshToken(res, '')
		// res.clearCookie('jid') // or you can use clear cookie
		return true
	}
}
