// Update with your config settings.
import path from 'path';

const envPath = path.resolve(__dirname, 'src', '.env');
const migrationsPath = path.resolve(__dirname, 'src', '_migrations');

require('dotenv').config({ path: envPath });
require('module-alias/register');

module.exports = {
	client: process.env.NODE_ENV === 'production' ? 'pg' : 'mysql2',
	connection: {
		host: process.env.CONNECTION_HOST,
		user: process.env.CONNECTION_USER,
		password: process.env.CONNECTION_PASSWORD,
		database: process.env.CONNECTION_DATABASE,
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
		dateStrings: true,
		multipleStatements: true,
	},
	debug: true,
	migrations: {
		directory: migrationsPath,
	},
};
