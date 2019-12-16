import { MiddlewareFn } from 'type-graphql'
import { redis } from '../../redis'
import { MyContext } from '../../types/MyContext'
// import { oneDay } from '../../constants'

export const rateLimit: (limitForAnonUser?: number, limitForUser?: number) => MiddlewareFn<MyContext> = (
	limitForAnonUser = 5, // limit for anonymous users
	limitForUser = 100, // limit for regular users
) => async ({ context: { req }, info }, next) => {
	const isAnon = !req.session.userId
	const visitorKey = `rate-limit:${info.fieldName}:${isAnon ? req.ip : req.session.userId}`

	// keep track of number of times the user has request a resolver using redis increment
	const current = await redis.incr(visitorKey)

	if ((isAnon && current > limitForAnonUser) || (!isAnon && current > limitForUser)) {
		throw new Error("you're doing that too much")
	} else if (current === 1) {
		// current key has been initialized by redis so set its expiration to 1 day for that particular user
		await redis.expire(visitorKey, 60)
	}

	return next()
}
