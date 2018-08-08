import {ADD_PLAYLIST, NEXT_TRACK, PREV_TRACK} from '../actions';

export default function playerReducer(state = { queue: [], index: 0}, action){
	switch (action.type){
		case ADD_PLAYLIST:
			return {queue: action.tracks, index: action.index}
		case NEXT_TRACK:
			return {...state, index: (state.index+1)%state.queue.length}
		case PREV_TRACK:
			return {...state, index: state.index ? state.index - 1 : 0}
		default:
			return state;	
	}
}