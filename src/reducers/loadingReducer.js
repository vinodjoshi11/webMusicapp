import {LOADER_ON, LOADER_OFF} from '../actions';
export default function searchReducer(state = false, action){
	switch(action.type){
		case LOADER_ON:
			return true;

		case LOADER_OFF:
			return false;

		default:
			return state;
	}
}