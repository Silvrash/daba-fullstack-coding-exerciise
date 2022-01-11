import { makeId, parseJson } from './utilities';
import firebase from 'firebase-admin';
import { Maybe } from './schema';
import K from './constants';

export async function uploadImage(data: Maybe<string>, path: string) {
	if (!data || !isBase64(data)) return data || '';

	const bucket = firebase.storage().bucket();

	await bucket.deleteFiles({ prefix: path });

	let file = bucket.file(`${path}/${makeId(3)}.png`);

	await file.save(Buffer.from(data, 'base64'), {
		contentType: 'image/jpeg',
		gzip: true,
		public: true,
	});
	await file.makePublic();
	return file.publicUrl();
}

export function isBase64(data?: string) {
	if (!data) return false;
	return Buffer.from(data, 'base64').toString('base64') === data;
}

export function initFirebaseClient() {
	if (firebase.apps?.length) return;

	firebase.initializeApp({
		credential: firebase.credential.cert(parseJson(K.FIREBASE_SERVICE_CONFIG!)),
		storageBucket: K.FIREBASE_STORAGE_BUCKET,
	});
}
