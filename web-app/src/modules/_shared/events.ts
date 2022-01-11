import K from './constants';
import { Emitter } from './emitter';
import { NotificationOptions } from './components/Notifications';

export function dismissNotifications() {
	Emitter.emit(K.EVENTS.SHOW_NOTIFICATION, {});
}

export function showErrorMessage(msg: string, title?: string, callBack?: Function) {
	dismissNotifications();
	if (msg === 'Failed to fetch') msg = K.ERRORS.FAILED_CONNECTION;

	Emitter.emit(K.EVENTS.SHOW_NOTIFICATION, {
		text: msg,
		header: title,
		error: true,
		callBack,
	});
}

export function showSuccessMessage(
	msg: React.ReactChild,
	title?: string,
	options?: NotificationOptions
) {
	dismissNotifications();
	Emitter.emit(K.EVENTS.SHOW_NOTIFICATION, {
		text: msg,
		header: title,
		info: true,
		...options,
	});
}

export function emitReloadEvent() {
	dismissNotifications();
	Emitter.emit(K.EVENTS.RELOAD, {});
}
