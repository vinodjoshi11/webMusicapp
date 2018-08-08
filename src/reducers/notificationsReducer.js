import { ADD_NOTIFICATION, REMOVE_NOTIFICATION} from '../actions';

export default function notificationsReducer(state = {counter: 0, list: {}}, action){
	switch (action.type){
		case ADD_NOTIFICATION:
			return {
				...state, 
				counter: state.counter+1, 
				list: {
					...state.list,
					[state.counter]: { ...action.notification, id: state.counter}
				}
		}
		case REMOVE_NOTIFICATION:
			const notifications = {...state.list};
			delete notifications[action.index];
			return {...state, list: notifications};
		default:
			return state;	
	}
}

// export default function notificationsReducer(state = [], action){
// 	switch (action.type){
// 		case ADD_NOTIFICATION:
// 			return [...state, action.notification];
// 		case REMOVE_NOTIFICATION:
// 			const notifications = [...state];
// 			notifications.splice(action.index, 1);
// 			return notifications;
// 		default:
// 			return state;	
// 	}
// }