/*import {GET_Playlists, LOADER_ON, LOADER_OFF} from './types';
import API_URL from '../api';
import axios from 'axios'

export function getPlaylists(user_id, limit){     alert(user_id)
    return function(dispatch){  //GET https://api.spotify.com/v1/users/{user_id}/playlists
        const url = `${API_URL}/users?ids=${user_id}/playlists`;
        alert(url)
        //const url = `${API_URL}/playlists?ids=${user_id}&limit=${limit}`;
        dispatch({type: LOADER_ON});
        axios.get(url).then(response => { console.log('ss');
            dispatch({type: LOADER_OFF});
            dispatch({type: GET_Playlists, playlists: response.data.playlists});
        });
    }
}*/
import uniqBy from 'lodash/uniqBy';

export const fetchPlaylistMenuPending = () => {
    return {
        type: 'FETCH_PLAYLIST_MENU_PENDING'
    };
};

export const fetchPlaylistMenuSuccess = (playlists) => {
    return {
        type: 'FETCH_PLAYLIST_MENU_SUCCESS',
        playlists
    };
};

export const fetchPlaylistMenuError = () => {
    return {
        type: 'FETCH_PLAYLIST_MENU_ERROR'
    };
};

export const addPlaylistItem = (playlist) => {
    return {
        type: 'ADD_PLAYLIST_ITEM',
        playlist
    };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchPlaylistMenuPending());

        fetch(request).then(res => { console.log(res)
            if(res.statusText === "Unauthorized") {
                window.location.href = './';
            }
            return res.json();
        }).then(res => {
            dispatch(fetchPlaylistMenuSuccess(res.items));
        }).catch(err => {
            dispatch(fetchPlaylistMenuError(err));
        });
    };
};


export const fetchPlaylistSongsPending = () => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_PENDING'
    };
};

export const fetchPlaylistSongsSuccess = (songs) => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
        songs
    };
};

export const fetchPlaylistSongsError = () => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_ERROR'
    };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchPlaylistSongsPending());

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            //remove duplicate tracks
            res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            });
            dispatch(fetchPlaylistSongsSuccess(res.items));
        }).catch(err => {
            dispatch(fetchPlaylistSongsError(err));
        });
    };
};
