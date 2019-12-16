import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../../types/MyContext'

// INFO: Here we create own middleware instead of using authCher provided in buildSchema
export const logger: MiddlewareFn<MyContext> = async ({ root, args, context, info }, next) => {
	console.log('Args: ', args)

	return next()
}
