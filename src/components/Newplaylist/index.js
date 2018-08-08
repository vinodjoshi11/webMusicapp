/*
import React from 'react';
import {connect} from 'react-redux';
import './Newplaylist.css';
import {addPlaylist} from '../../actions';

function  NewplaylistViewList(props){
    const { tracks, current } = props;
    /!*    console.log(tracks)
        console.log(tracks[current])*!/
    if(tracks[current]){
        console.log(tracks[current].preview_url)
        localStorage.setItem('liveStrem',tracks[current].preview_url)
    }
    return (
        <div>
            <div className="userName">user<span id={"userName"}></span></div>
            <div>
                <div className="visible Broadcast">
                    <input type="text" id="conference-name" placeholder="User Name"/>
                    <button id="start-conferencing">Join</button>
                </div>
            </div>
            {/!* {tracks.map((track, i) => (
                        <div key={i}>
                            <span id={i}>{track.preview_url}</span>
                        </div>
                    ))}*!/}
            <div id="participants" className="participants"></div>
        </div>
    )

}


function mapStateToProps(state){// console.log(state.player.index)
    return {
        queue: state.player.queue,
        index: state.player.index,
        current: state.player.index
    }
}

export default connect(mapStateToProps, {addPlaylist})(NewplaylistViewList);
*/

import Newplaylist from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaylistsMenu, fetchPlaylistSongs } from '../../actions/playlistActions';
import { updateHeaderTitle } from '../../actions/uiActions';

const mapStateToProps = (state) => {

    return {
        //userId: state.userReducer.user ? state.userReducer.user.id : '',
        //playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : '',
        //token: state.tokenReducer.token ? state.tokenReducer.token : '',
        // title: state.uiReducer.title
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        fetchPlaylistsMenu,
        fetchPlaylistSongs,
        updateHeaderTitle
    }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(Newplaylist);
