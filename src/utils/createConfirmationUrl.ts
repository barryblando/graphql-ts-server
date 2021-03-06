import { v4 as uuid } from 'uuid'
import { redis } from '../redis'
import { confirmUserPrefix } from '../constants'

export const createConfirmationUrl = async (userId: number) => {
	const token = uuid()
	// INFO: set redis key:value pair, value is going to be the person who will need to confirm
	await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24) // 1 day expiration

	// URL will redirect back to frontend, frontend will call a mutation
	return `http://localhost:3000/user-confirm/${token}`
}
