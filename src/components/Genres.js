import React from 'react';
import axios from 'axios';

import ArtistList from './artists/ArtistList';
import API_URL from '../api';

export default class Genres extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: [],
		}
	}

	componentDidMount() {
		const url = `${API_URL}/search/?q=%20genre:%22${this.props.match.params.genre}%22&type=artist`;
		axios.get(url).then(response => {
			this.setState({artists: response.data.artists.items});
		});
	}

	renderResults(){
		const items = this.state.artists;
		if (items.length === 0 && this.refs.search && this.refs.search.value) return <p className="empty">No Results Found</p>
		if (items.length) {
			return (
				<div>
					 <ArtistList {...this.state} />
				</div>
			)
		}
	}


	render(){
		return(
			<div className="main-wrap">
				<h2>Genre: {this.props.match.params.genre}</h2>
				
				{this.renderResults()}

			</div>
		);
	}
}

// export default connect(null, {addNotification})(Search);