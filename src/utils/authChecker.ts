import { AuthChecker } from 'type-graphql'
import { User } from '../entity/User'
import { IContext } from '../types/MyContext'
import { verify } from 'jsonwebtoken'

export const authChecker: AuthChecker<IContext> = async ({ context }, roles): Promise<boolean> => {
	const authorization = context.req.headers['authorization'] // bearer token

	if (!authorization) {
		return false // Access denied
	}

	const token = authorization.split(' ')[1]
	const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string }

	if (roles.length === 0) {
		// if `@Authorized() roles empty`, check is user exist
		// return !!context.req.session.userId - session
		return !!payload.userId
	}

	// if there are some roles defined now in [resolvers, field]
	// if (!context.req.session.userId) { - session
	if (typeof payload.userId === 'undefined') {
		// and if no user logged in, restrict access
		return false
	}

	// get the user
	// const user = await User.findOne(req.session.userId) - session
	const user = await User.findOne(payload.userId)

	if (!user) {
		throw new Error('User not found')
	}

	// and check his permission in db against `roles` argument
	const matchRoles = user.roles.filter((roleUserHave) => roles.includes(roleUserHave))

	if (!matchRoles.length) {
		throw new Error(`You do not have sufficient permissions: ${roles}, You Have: ${user.roles}`)
	}

	return true
}
