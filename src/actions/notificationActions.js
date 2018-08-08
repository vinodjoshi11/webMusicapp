import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from './types';

export function addNotification(notification){
	return {
		type: ADD_NOTIFICATION,
		notification
	}
}

export function removeNotification(index){
	return {
		type: REMOVE_NOTIFICATION,
		index
	}
}