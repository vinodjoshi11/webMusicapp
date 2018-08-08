import {ADD_PLAYLIST, NEXT_TRACK, PREV_TRACK} from './types';

export function addPlaylist(tracks, index){//console.log(tracks);
	return {
		type: ADD_PLAYLIST,
		tracks,
		index
	}
}

export function nextTrack(){
	return { type: NEXT_TRACK }
}

export function prevTrack(){
	return { type: PREV_TRACK }
}