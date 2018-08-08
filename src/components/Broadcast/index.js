import React from 'react';
import {connect} from 'react-redux';
import {addPlaylist} from '../../actions';
var socket = io();
function JoinBroadcast(props){
    const { tracks, addPlaylist, current } = props;

    if(tracks[current]) {
            var url = tracks[current].preview_url;
            socket.emit('send:url', url);
       // console.log(url);
       //console.log(socket);
    }
      return (
        <div className={'livestream'}>
            <div className="userName">UserName:<span id={'user'}></span></div>
            <input type="text" id="userName" name='textName' placeholder="Enter Your Name"/>
            <button id="Join" className='button' onClick={handleJoin}>Join</button>
        </div>
      )
}
function handleJoin(props){
var userName=document.getElementById('userName').value;
    socket.emit('send:userName', userName);
    $('#user').html(userName);
    if (userName!= '') {
        document.getElementById('Join').style.display='none';
        document.getElementById('userName').style.display='none';
        document.getElementById('messageSend').style.display='block';
        //document.getElementById('liveStream').style.display='block';
    }else {console.log(1);
    }
    var visibleElements = document.getElementsByClassName('userName'),
        length = visibleElements.length;
    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'block';
    }
}
function mapStateToProps(state){ // console.log(state)
    return {
        queue: state.player.queue,
        index: state.player.index,
        current: state.player.index
    }
}
export default connect(mapStateToProps, {addPlaylist})(JoinBroadcast);