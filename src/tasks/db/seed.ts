import 'reflect-metadata'

import { createConnection, Connection } from 'typeorm'

import { typeOrmConfig } from '../../ormconfig'
import { Roles, User } from '../../entity/User'

const startServer = async () => {
	console.log('Beginning db seed task.')

	const connection: Connection = await createConnection(typeOrmConfig)
	console.log('PG connected.')

	// Create seed data.
	console.log('Inserting a new users into the database...')
	await connection
		.createQueryBuilder()
		.insert()
		.into(User)
		.values([
			{
				firstName: 'Barry',
				lastName: 'Blando',
				email: 'barryblando@gmail.com',
				password: 'Weq!71',
				confirmed: true,
				roles: [Roles.ADMIN],
			},
			{
				firstName: 'Gabriela',
				lastName: 'Leskur',
				email: 'gabrielaleskur@gmail.com',
				password: 'Qeq!81',
				confirmed: true,
			},
		])
		.execute()

	console.log('Loading users from the database...')
	const users = await connection.manager.find(User)
	console.log('Loaded users: ', users)

	// Close connection
	await connection.close()
	console.log('PG connection closed.')

	console.log('Finished db seed task.')
}

startServer().catch(err => console.log(err))
