import {GET_ARTISTS, LOADER_ON, LOADER_OFF} from './types';
import API_URL from '../api';
import axios from 'axios'

export function getArtists(artists, limit){
    return function(dispatch){
        dispatch({type: LOADER_ON});
        const url = `${API_URL}/artists?ids=${artists}&limit=${limit}`;
		axios.get(url).then(response => {
            dispatch({type: LOADER_OFF});
            dispatch({type: GET_ARTISTS, artists: response.data.artists});
        });
    }
}