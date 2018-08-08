import React from 'react';
import {connect} from 'react-redux';
import './webrtc.css';
import {addPlaylist} from '../../actions';
//import socketIOClient from 'socket.io-client';

function RtcViewList(props){
    const { tracks, current} = props;
  //  let SERVER="http://localhost:3001/";

    if(tracks[current]){
        /*const socket = socketIOClient(SERVER);
        socket.emit('message-test', {'message': 'hello world'});*/
       // socket.broadcast.emit('Join', tracks[current].preview_url);
        //socket.broadcast.send('streemURL', JSON.stringify(tracks[current].preview_url));

        /*  if(document.getElementById("remote-media-streams")) {
            var remoteaudio = document.getElementById('remote-media-streams').getElementsByTagName('audio');
            for (let i = 0; i < remoteaudio.length; i++) {
                var remote = remoteaudio[i];
                console.log(remote);
                remote.setAttribute('src', tracks[current].preview_url);
                console.log(remote);
            }
        }
        console.log(tracks[current].preview_url)*/
        localStorage.setItem('liveStrem',tracks[current].preview_url)
        if(document.getElementById("stremAudio")) { console.log('sss')
         //   let stremAudiosrc =localStorage.getItem('liveStrem');
          /*  let AudioStremSrc= document.getElementById('stremAudio')
            AudioStremSrc.setAttribute('src', tracks[current].preview_url);
            AudioStremSrc.play();
            console.log('addplaylist');
            console.log(AudioStremSrc.currentTime);*/
            //console.log(this.state.duration);
           // console.log(stremAudiosrc);
            /*if(this.state.playing){
                 console.log(this.state.playing)
                 document.getElementById('stremAudio').pause();
             } else {		//console.log(this.state.playing)
                 document.getElementById('stremAudio').play();
             }*/

        }
    }  return (
                <div>
                    <div className="userName">user<span id={'userName'}></span></div>
                    {/*<div>
                        <div className="visible Broadcast">
                            <input type="text" id="conference-name" name='textname' placeholder="User Name"/>
                            <button id="start-conferencing" type="submit" className='button' disabled>Join</button>
                        </div>
                    </div>*/}
                    <section>
                        <input type="text" id="conference-name" name='textname' placeholder="User Name"/>
                        <button id="setup-new-meeting" className='button' >Join</button>
                    </section>
                    <div >
                    <div id="local-media-stream"></div>

                    <div id="remote-media-streams"></div>

                    </div>
                   <div id="duration"></div>
                   {/* {tracks.map((track, i) => (
                        <div key={i}>
                            <span id={i}>{track.preview_url}</span>
                        </div>
                    ))}*/}
                    <div id="participants" className="participants"></div>
                </div>
            )

}


function mapStateToProps(state){ //console.log(state)
    return {
        queue: state.player.queue,
        index: state.player.index,
        current: state.player.index
    }
}

export default connect(mapStateToProps, {addPlaylist})(RtcViewList);