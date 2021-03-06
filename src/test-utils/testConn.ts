import { createConnection } from 'typeorm'

export const testConn = (drop = false) => {
	return createConnection({
		type: 'postgres',
		host: '127.0.0.1',
		port: 5432,
		username: 'bblando0x316',
		password: 'postgres',
		database: 'testdb-dev',
		synchronize: drop,
		dropSchema: drop,
		entities: [__dirname + '/../entity/**/*.*'],
	})
}
