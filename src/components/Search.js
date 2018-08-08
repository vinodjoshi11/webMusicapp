import React from 'react';
import {connect} from 'react-redux';
// import {Loader} from './shared';
import Albums from './albums/Albums';
import ArtistList from './artists/ArtistList';
import {Loader} from './shared';
import {addNotification, search, clearResults} from '../actions';
import API_URL from '../api';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: props.match.params.type,
			albums: [],
			artists: [],
		}
	}
	componentWillReceiveProps(nextProps) {
		const type = nextProps.match.params.type;
		if (this.state.type !== type) {
			this.props.clearResults();
			this.refs.search.value = "";
			this.setState({type});
		}
	}

	componentDidMount() {
		this.props.clearResults();
		const container = document.querySelector('.main-content');
		this.handleScroll = this.handleScroll.bind(this, container);
		container.addEventListener('scroll', this.handleScroll);
	}

	handleScroll(container, e){
		const total_height = container.scrollHeight;
		const height = container.clientHeight;
		const scroll = container.scrollTop;
		if (scroll + height >= total_height) {
			this.handleSubmit(e, true);	
		}
	}

	componentWillUnmount(){
		document.querySelector('.main-content').removeEventListener('scroll', this.handleScroll);
	}

	handleSubmit(event, paginate){
		event.preventDefault();

		const keyword = this.refs.search.value;
		if (!keyword) {
			this.props.addNotification({
				type: "error",
				text: "Enter a keyword first!"
			});
			return;
		}
		const type = this.state.type;
		let url = `${API_URL}/search/?q=${keyword}&type=`;
		url = type === "albums" ? url + "album" : url + "artist";

		url = paginate ? this.props.results.next : url;
		this.props.search(url, type, paginate);
	}

	renderResults(){
		const items = this.props.results.items;
		if (items.length === 0 && this.refs.search && this.refs.search.value && !this.props.loading) return <p className="empty">No Results Found</p>
		if (items.length) {
			return (
				<div>
					{this.state.type === "albums" ? <Albums albums={items} /> : <ArtistList artists={items} />}
				</div>
			)
		}
	}


	render(){
		return(
			<div className="main-wrap">
				<h5>Search for {this.state.type}</h5>
				<form className="search-form" onSubmit={(event) => this.handleSubmit(event)}>
					<input type="text" placeholder="Search..." ref="search"  />
				</form>
				{this.renderResults()}
				{this.props.loading && <Loader />}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		results: state.results,
		loading: state.loading
	}
}
export default connect(mapStateToProps, {addNotification, search, clearResults})(Search);