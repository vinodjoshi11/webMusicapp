import React from 'react';
// import ReactPlayer from 'react-player';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Tracklist from '../tracks/Tracklist';
import {Loader} from '../shared';
import API_URL from '../../api';

export default class SingleAlbum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			album: {},
			// activeTrack: this.album.tracks.items[0] || {}
		}
			
	}

	componentDidMount() {
		const album_id = this.props.match.params.id;
		const url = `${API_URL}/albums/${album_id}`;
		axios.get(url).then(response => {
			const album = {...response.data}
			//console.log(response)
			delete album.tracks;
			response.data.tracks.items.map(item => item.album = album);
			this.setState({album: response.data})
		})
	}

	render(){
		const album = this.state.album;
		if (!album.name) {
			return <Loader />
		}

		return(
			<div className="main-wrap album">
				<div className="album__side">
					<img src={album.images[0].url} alt=""/>
					<h1 className="album__title">{album.name} <div>{album.artists[0].name}</div></h1>
					<p className="album__total">{album.tracks.total} tracks</p>
					<Link className="button" to={`/artist/${album.artists[0].id}`}>Artist Profile</Link>
				</div>
				<div className="album__main">
					<Tracklist playTrack={this.props.playTrack} current={this.props.current} tracks={album.tracks.items} />
				</div>
			</div>
		)
	}
}