import {SEARCH, CLEAR_RESULTS, LOADER_ON, LOADER_OFF} from './types';
import axios from 'axios';

export function search(url, type, paginate){
	return function(dispatch){
		dispatch({type: LOADER_ON});
		axios.get(url).then(response => {
			dispatch({type: LOADER_OFF});
			dispatch({
				type: SEARCH, 
				items: response.data[type].items, 
				next:response.data[type].next,
				paginate
			});
		});
	}
}

export function clearResults(){
	return { type: CLEAR_RESULTS };
}