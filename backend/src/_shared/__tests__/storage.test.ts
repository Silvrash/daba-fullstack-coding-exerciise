import { isBase64, uploadImage } from '../storage';
import { initFirebaseClient } from '../storage';
import firebase from 'firebase-admin';

describe('uploadImage', () => {
	const { publicUrl, makePublic, save } = require('../__mocks__/firebase-admin');
	const base64String = Buffer.from('sample').toString('base64');

	beforeEach(() => {
		(<any>firebase).apps = [];
		publicUrl.mockReturnValue(Promise.resolve('url from jest'));
	});

	afterEach(() => {
		(publicUrl as jest.Mock).mockReset();
		(makePublic as jest.Mock).mockReset();
		(save as jest.Mock).mockReset();
		(firebase.initializeApp as jest.Mock).mockReset();
		(firebase.credential.cert as jest.Mock).mockReset();
	});

	it('should not upload', async () => {
		const fileUrl = await uploadImage('', '/any');

		expect(save).not.toHaveBeenCalled();
		expect(makePublic).not.toHaveBeenCalled();
		expect(publicUrl).not.toHaveBeenCalled();
		expect(fileUrl).toBeFalsy();
	});

	it('should upload', async () => {
		const fileUrl = await uploadImage(base64String, '/any');
		expect(fileUrl).toBe('url from jest');
		expect(save).toBeCalledTimes(1);
		expect(makePublic).toBeCalledTimes(1);
		expect(publicUrl).toBeCalledTimes(1);
	});

	it('should initialize firebase client', () => {
		initFirebaseClient();
		expect(<jest.Mock>firebase.initializeApp).toBeCalledTimes(1);
		expect(<jest.Mock>firebase.credential.cert).toBeCalledTimes(1);
	});

	it('should not initialize firebase client if apps already exist', () => {
		firebase.apps.push({ newApp: 'app' } as any);
		initFirebaseClient();
		expect(<jest.Mock>firebase.initializeApp).not.toBeCalled();
		expect(<jest.Mock>firebase.credential.cert).not.toBeCalled();
	});
});

describe('isBase64', () => {
	it('should return true', () => {
		const base64String = Buffer.from('sample').toString('base64');
		expect(isBase64(base64String)).toBe(true);
	});

	it('should return false', () => {
		expect(isBase64('122ao')).toBe(false);
		expect(isBase64('')).toBe(false);
	});
});
