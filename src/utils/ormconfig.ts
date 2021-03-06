import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// Will be true on deployed functions
const prod = process.env.NODE_ENV === 'production'

const rootDir = process.env.NODE_ENV === 'production' ? 'build' : 'src'

const typeOrmConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.TYPEORM_HOST,
	port: 5432,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	synchronize: true, // tell typeOrm  to create the tables if they don't exist. Do not use in Production
	// dropSchema: true, // drops the schema each time connection is being established. Debug and Development only. Do not use in Production
	logging: true,
	entities: [rootDir + '/entity/**/*.{js,ts}'],
	migrations: [rootDir + '/migration/**/*.{js,ts}'],
	subscribers: [rootDir + '/subscriber/**/*.{js,ts}'],
	cli: {
		entitiesDir: 'entity',
		migrationsDir: 'migration',
		subscribersDir: 'subscriber',
	},
	// Production Mode
	...(prod && {
		logging: false,
		// synchronize: false,
	}),
}

export { typeOrmConfig, prod }
