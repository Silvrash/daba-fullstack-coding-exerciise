const K = {
	VERSION: 1,
	IS_DEV: process.env.NODE_ENV !== 'production',
	IS_TESTS: process.env.NODE_ENV === 'test',
	PORT: process.env.PORT ?? 6877,
	SECRET_KEY: process.env.SECRET_KEY || '',
	SUPPORTED_VERSIONS: {
		CLIENT: '1.8.0',
	},
	ERRORS: {
		AUTHENTICATION_ERROR: 'Please login to proceed',
		AUTHENTICATION_FAILED: 'Incorrect credentials',
		USER_NOT_FOUND: 'User not found',
		USER_ALREADY_EXISTS: 'User Already Exists',
		DUPLICATE: 1062,
		SOMETHING_WENT_WRONG: 'Something went wrong, our team will investigate into this',
	},
	DB_CONNECTION: {
		HOST: process.env.CONNECTION_HOST,
		USER: process.env.CONNECTION_USER,
		PASSWORD: process.env.CONNECTION_PASSWORD,
		DATABASE: process.env.CONNECTION_DATABASE,
		LOGGING: process.env.LOGGING === 'true',
	},
	FIREBASE_SERVICE_CONFIG: process.env.FIREBASE_SERVICE_CONFIG,
	FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
};

export const DB = {
	users: 'users',
};

export default K;
