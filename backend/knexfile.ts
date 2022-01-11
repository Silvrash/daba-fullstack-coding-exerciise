// Update with your config settings.
import path from 'path';
import { readdirSync } from 'fs';

const getLatest = (source: string) => {
	const versions = readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory() && dirent.name.startsWith('v'))
		.map((dirent) => ({ path: path.join(source, dirent.name), version: dirent.name }));
	return versions[versions.length - 1];
};

const latest = getLatest(path.resolve(__dirname, ''));

let envPath;
let migrationsPath;
if (process.env.NODE_ENV === 'production') {
	const pathToLatest = latest.path;
	envPath = path.resolve(pathToLatest, '.env');
	migrationsPath = path.resolve(pathToLatest, '_migrations');
} else if (process.env.NODE_ENV === 'test') {
	envPath = path.resolve(__dirname, 'src', '.env.test');
	migrationsPath = path.resolve(__dirname, 'src', '_migrations');
} else {
	envPath = path.resolve(__dirname, 'src', '.env');
	migrationsPath = path.resolve(__dirname, 'src', '_migrations');
}

require('dotenv').config({ path: envPath });
require('module-alias/register')

module.exports = {
	client: 'mysql2',
	connection: {
		host: process.env.CONNECTION_HOST,
		user: process.env.CONNECTION_USER,
		password: process.env.CONNECTION_PASSWORD,
		database: process.env.CONNECTION_DATABASE,
		dateStrings: true,
		multipleStatements: true,
	},
	debug: true,
	migrations: {
		directory: migrationsPath,
	},
};
