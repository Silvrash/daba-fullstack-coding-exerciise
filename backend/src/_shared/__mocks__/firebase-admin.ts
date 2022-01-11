export const publicUrl = jest.fn();
export const makePublic = jest.fn();
export const save = jest.fn();
export const sendMulticast = jest.fn();

export default {
	storage: () => ({
		bucket: () => ({
			file: (_: string) => ({
				save,
				makePublic,
				publicUrl,
			}),
			deleteFiles: jest.fn(),
		}),
	}),
	messaging: () => ({
		sendMulticast,
	}),
	initializeApp: jest.fn(),
	credential: { cert: jest.fn() },
	apps: [] as any[],
};
