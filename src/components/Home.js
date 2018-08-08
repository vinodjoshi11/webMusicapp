import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ArtistList from './artists/ArtistList';
import API_URL from '../api';
import {Loader} from './shared';
import {getArtists} from '../actions';
//import {getPlaylist} from '../actions/playlistActions';

class Home extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			artists: [],
		}
	}

	componentDidMount() {
		const limit = 50;
		
		const artists = `4tZwfgrHOc3mvqYlEYSvVi,4gzpq5DPGxSnKTe4SA8HAU,4Z8W4fKeB5YxbusRsdQVPb,1ZwdS5xdxEREPySFridCfh,3WrFJ7ztbogyGnTHbHJFl2,711MCceyCBcFnzjGY4Q7Un,0du5cEVh5yTK9QJze8zA0C,6l3HvQ5sa6mXTsMTB19rO5,6FQqZYVfTNQ1pCqfkwVFEa,3kjuyTCjPG1WMFCiyc5IuB,6eUKZXaKkcviH0Ku9w2n3V,7jdFEYD2LTYjfwxOdlVjmc`
		const url = `${API_URL}/artists?ids=${artists}&limit=${limit}`;
		this.props.getArtists(artists, limit);
        //axios.get(url).then(response => this.setState({artists: response.data.artists}));
		  axios.get(url).then(response => this.setState({artists: response.data.artists}));
	}


	render(){
		return(
			
			<div className="main-wrap">
				<h1 className="main-title">Top Artists</h1>
				<ArtistList artists={this.props.artists} />
				{this.props.loading && <Loader></Loader>}
               {/* <button id="start-broadcasting" className="setup">Start Transmitting Yourself!</button>
                <div id="videos-container"></div>*/}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		loading: state.loading,
		artists: state.artists.featured
	}
}

// function mapDispatchToProps(dispatch){
// 	return{
// 		loaderOn : dispatch()
// 	}
// }
export default connect(mapStateToProps, {getArtists})(Home);