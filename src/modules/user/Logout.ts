import { Resolver, Mutation, Ctx } from 'type-graphql'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class LogoutResolver {
	@Mutation(returns => Boolean)
	async logout(@Ctx() ctx: MyContext): Promise<boolean> {
		return new Promise((resolve, reject) =>
			ctx.req.session.destroy(err => {
				if (err) {
					console.log(err)
					return reject(false)
				}

				ctx.res.clearCookie('qid') // clear cookie
				return resolve(true)
			}),
		)
	}
}
