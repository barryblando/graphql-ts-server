import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// Will be true on deployed functions
const prod = process.env.NODE_ENV === 'production'

const typeOrmConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.TYPEORM_HOST,
	port: 5432,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	synchronize: true, // tell typeorm  to create the tables if they don't exist. Do not use in Production
	// dropSchema: true, // drops the schema each time connection is being established. Debug and Development only. Do not use in Production
	logging: true,
	entities: ['src/entity/**/*.*'],
	migrations: ['src/migration/**/*.*'],
	subscribers: ['src/subscriber/**/*.*'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
	// Production Mode
	...(prod && {
		database: 'production',
		logging: false,
		// synchronize: false,
	}),
}

export { typeOrmConfig, prod }
