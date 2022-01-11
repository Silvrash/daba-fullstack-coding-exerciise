import winston, { format } from 'winston';
import K from './constants';

winston.addColors(winston.config.npm.colors);

const errorTransport = [
	new winston.transports.File({
		filename: 'error.log',
		level: 'error',
		format: format.combine(format.errors({ stack: true })),
	}),
	new winston.transports.File({
		filename: 'info.log',
		level: 'info',
		format: format.combine(format.errors({ stack: true })),
	}),
];
const transports = [
	new winston.transports.Console({
		level: 'debug',
		format: format.combine(format.errors({ stack: true }), format.colorize({ all: true })),
	}),
	...errorTransport,
];

export const logger = winston.createLogger({
	levels: winston.config.npm.levels,
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
		format.printf(
			({ level, message, label, timestamp }) => `${timestamp} ${label || '-'} ${level.toUpperCase()}: ${message}`,
		),
	),
	transports: K.IS_DEV && !K.IS_TESTS ? transports : errorTransport,
});
