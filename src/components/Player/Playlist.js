import React from 'react';
import Tracklist from '../tracks/Tracklist'
import {connect} from 'react-redux';

class Playlist extends React.Component{
	render(){
		if (!this.props.playlist.length) {
			return (
				<div className="empty-queue">
					<p className="empty">Queue is empty</p>
					<small>Try playing some tracks.</small>
				</div>
			)
		}
		return(
			<div className="queue">
				<h1>Current Queue</h1>
				<Tracklist 
				tracks={this.props.playlist} 
				addPlaylist={this.props.addPlaylist} 
				current={this.props.current} 
				/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		playlist : state.player.queue
	}
}

export default connect(mapStateToProps)(Playlist);