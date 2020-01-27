import { Connection } from 'typeorm'
import faker from 'faker'
import { redis } from '../../../redis'
import { User } from '../../../entity/User'
import { gCall } from '../../../test-utils/gCall'
import { testConn } from '../../../test-utils/testConn'

let conn: Connection

beforeAll(async () => {
	conn = await testConn()
})

const registerMutation = `
	mutation Register($data: RegisterInput!) {
		register(data: $data) {
			firstName
			lastName
			email
		}
	}
`

describe('Register', () => {
	it('create user', async () => {
		const user = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: 'wWeb!23',
		}

		gCall({
			source: registerMutation,
			variableValues: {
				data: user,
			},
		}).then(async response => {
			const dbUser = await User.findOne({ where: { email: response.data.email } })

			expect(response).toMatchObject({
				data: {
					register: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					},
				},
			})

			expect(dbUser).toBeDefined()
			expect(dbUser.confirmed).toBeFalsy() // make sure user is not confirm
		})
	})
})

afterAll(async () => {
	// close all database connections, redis included
	await conn.close()
	redis.disconnect()
})
