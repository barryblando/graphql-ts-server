import 'reflect-metadata'

import { createConnection, Connection } from 'typeorm'

import { typeOrmConfig } from '../../../ormConfig'
import { User } from '../../entity/User'

const startServer = async () => {
	console.log('Beginning db seed task.')

	const connection: Connection = await createConnection(typeOrmConfig)
	console.log('PG connected.')

	// Create seed data.
	console.log('Inserting a new user into the database...')
	const user = new User()
	user.firstName = 'Timber'
	user.age = 25
	await connection.manager.save(user)
	console.log('Saved a new user with id: ' + user.id)

	console.log('Loading users from the database...')
	const users = await connection.manager.find(User)
	console.log('Loaded users: ', users)

	// Close connection
	await connection.close()
	console.log('PG connection closed.')

	console.log('Finished db seed task.')
}

startServer().catch(err => console.log(err))
