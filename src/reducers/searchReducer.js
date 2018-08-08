import {SEARCH, CLEAR_RESULTS} from '../actions';
const initialState = { items:[], next : "" }
export default function searchReducer(state = initialState, action){
	switch(action.type){
		case SEARCH:
			let items = [...action.items];
			if (action.paginate) items = [...state.items, ...items];
			return {
				items,
				next: action.next
			}

		case CLEAR_RESULTS:
			return initialState;

		default:
			return state;
	}
}