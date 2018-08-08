import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import uiReducer from './uiReducer';
import playlistReducer from './playlistReducer';
import playerReducer from './playerReducer';
import notificationsReducer from './notificationsReducer';
import searchReducer from './searchReducer';
import loadingReducer from './loadingReducer';
import artistsReducer from './artistsReducer';

export default combineReducers({
    user:userReducer,
    token:tokenReducer,
    playlist:playlistReducer,
    ui:uiReducer,
	player: playerReducer,
	notifications: notificationsReducer,
	results: searchReducer,
	loading: loadingReducer,
	artists: artistsReducer,
});

