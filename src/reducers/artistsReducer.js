import {GET_ARTISTS} from '../actions';

export default function artistsReducer(state = { featured: [] }, action){
	switch(action.type){
		case GET_ARTISTS:
			let artists = [...action.artists];
			// if (action.paginate) items = [...state.items, ...items];
			return {
				featured: artists
			}

		default:
			return state;
	}
}