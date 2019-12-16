import 'dotenv/config'
import { createAccessToken } from './../../../utils/authToken'
import { User } from './../../../entity/User'
import { Connection } from 'typeorm'
import faker from 'faker'
import { redis } from './../../../redis'
import { gCall } from './../../../test-utils/gCall'
import { testConn } from './../../../test-utils/testConn'

let conn: Connection

beforeAll(async () => {
	conn = await testConn()
	console.log('Redis Status: ', redis.status)
})

const meQuery = `
	{
		me {
			id
			firstName
			lastName
			email
		}
	}
`

describe('Me', () => {
	it('get user', async () => {
		const user = await User.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
		})

		gCall({
			source: meQuery,
			accessToken: createAccessToken(user),
		}).then(async response => {
			expect(response).toMatchObject({
				data: {
					me: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					},
				},
			})
		})
	})

	it('return null', async () => {
		gCall({
			source: meQuery,
		}).then(async response => {
			expect(response).toMatchObject({
				data: {
					me: null,
				},
			})
		})
	})
})

afterAll(async () => {
	// close all database connections, redis included
	await conn.close()
	redis.disconnect()
})
