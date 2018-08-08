import React from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Progress from './Progress';
import {nextTrack, prevTrack, addNotification} from '../../actions';
import {WordSlider} from '../shared';
import {mobileDetect} from '../../utils';
import './player.css';
var socket = io();
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: !mobileDetect(),
			played: 0,
			progress: 0,volume: 0.8,
            messages : [],
			userid : 0,
			users : 0,
			liveStream:'s',
			duration: 30
		}
		this.onProgress = this.onProgress.bind(this);
		this.playPause = this.playPause.bind(this);
		this.seekTrack = this.seekTrack.bind(this);
		this.handleEnded = this.handleEnded.bind(this);
        this.urlReceive = this.urlReceive.bind(this);
        this.userAccept = this.userAccept.bind(this);
        this.userJoin = this.userJoin.bind(this);
	} componentDidMount() {
        socket.emit('user:request');
        socket.on('user:accept', this.userAccept);
        socket.on('user:join', this.userJoin);
        socket.on('send:url', this.urlReceive);
    }
	componentWillReceiveProps(nextProps) {
		if (this.props.current && nextProps.current.id !== this.props.current.id) {
			this.setState({playing: true});
			clearTimeout(this.autoNext);
		}
		if (!nextProps.current.preview_url) this.noTrack();

		const count = nextProps.current.album.images.length;
		if (count > 0) {
			this.image = nextProps.current.album.images[count-1].url;
		}
	}
    userAccept(msg) {
        this.setState({userid: msg.id});
    }
    userJoin() {

    }urlReceive(url){
        var userName=document.getElementById('userName').value;
        //if (userName!= '') {
            console.log(this.state.userid);
            this.state.liveStream = url;
            //this.state.liveStream = url;
           // this.setState({url: this.state.liveStream});
        //}
        console.log(this.state.progress)
    }
    onProgress({played}, loaded){	 // console.log(played);
		if (played !== undefined) { //console.log(played);
			this.setState({played});
        }
        //let AudioStremSrc= document.getElementById('stremAudio')
        //played=AudioStremSrc.currentTime
        //console.log(played);
        //console.log(AudioStremSrc.currentTime);
	}
	playPause(){
		this.setState({playing: !this.state.playing})
        var id = document.getElementsByTagName("audio")[0].getAttribute("id");
        var element= document.getElementById('messageSend');
        if(element.style.display == 'block'){ console.log(this.state.userid)
            //socket.emit('send:url', url);
			if(document.getElementById(id)) {
				if (this.state.playing) {
					document.getElementById(id).pause();
				} else {		//console.log(this.state.playing)
					document.getElementById(id).play();
				}
			}
		}
	}

	seekTrack(target){
		this.player.seekTo(target);

	}
	handleEnded(){
		if (this.props.index === this.props.queue.length -1) {
			this.player.seekTo(0);
			this.setState({playing: false, played: 0, progress: 0});
		}
		else{
			this.props.nextTrack()
		}
	}
	noTrack(){
		this.props.addNotification({
			type: "error",
			text: "This track has no preview"
		});
		this.autoNext = setTimeout(this.props.nextTrack, 2000);

	}setVolume = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }
	render(){
		const { current } = this.props;
		if (!current) return null;
		return(
			<div className="player-wrapper">
				<div className="music-player">
					<div className="current-track">
						<div className="current-track__image">
							<Link to={`/album/${current.album.id}`}>
								<div className="image-container" style={{backgroundImage: `url(${this.image})`}}></div>
							</Link>
						</div>
						<div className="current-track__details">
							<WordSlider>
								<h6>{current.name}</h6>
							</WordSlider>
							<h6><Link to={`/artist/${current.artists[0].id}`}>{current.artists[0].name}</Link></h6>
						</div>
					</div>
					<div className="player-controls">
						<div className="player-controls__buttons">
							<a className="player-controls__button" onClick={this.props.prevTrack}>
								<i className="icon-to-start" aria-hidden="true"></i>
							</a>
							<a className="player-controls__button" onClick={this.playPause}>
								<i id={'player'} className={` icon-${this.state.playing ? "pause" : "play"}`} aria-hidden="true"></i>
							</a>

							<a className="player-controls__button" onClick={this.props.nextTrack}>
								<i className="icon-to-end" aria-hidden="true"></i>
							</a>
						
						</div>
						<Progress seekTrack={this.seekTrack} played={this.state.played} duration={this.state.duration} />
					</div>
					
					<ReactPlayer 
					ref={player => { this.player = player }} 
					playing={this.state.playing} 
					url={current.preview_url} 
					onEnded={this.handleEnded}
					onProgress={this.onProgress}
                    volumevolume={this.state.volume}
					progressFrequency={10}
					hidden
					height="auto" />

				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		queue: state.player.queue,
		index: state.player.index,
		current: state.player.queue[state.player.index]
	}

}

export default connect(mapStateToProps, {nextTrack, prevTrack, addNotification})(Player);
