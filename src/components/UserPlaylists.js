/*
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import UserPlaylists from './UserPlaylists/component';
import API_URL from '../api';
import {Loader} from './shared';
import {getPlaylists} from '../actions';
class userplaylist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
        }
    }

    componentDidMount() {
        const limit = 50;
        //const artists = `4tZwfgrHOc3mvqYlEYSvVi,4gzpq5DPGxSnKTe4SA8HAU,4Z8W4fKeB5YxbusRsdQVPb,1ZwdS5xdxEREPySFridCfh,3WrFJ7ztbogyGnTHbHJFl2,711MCceyCBcFnzjGY4Q7Un,0du5cEVh5yTK9QJze8zA0C,6l3HvQ5sa6mXTsMTB19rO5,6FQqZYVfTNQ1pCqfkwVFEa,3kjuyTCjPG1WMFCiyc5IuB,6eUKZXaKkcviH0Ku9w2n3V,7jdFEYD2LTYjfwxOdlVjmc`
        const url = `${API_URL}/playlists?ids=${playlists}&limit=${limit}`;
        this.props.getPlaylists(playlists, limit);
        axios.get(url).then(response => this.setState({playlists: response.data.playlists}));
    }


    render(){
        return(
            <div className="main-wrap">
                <h1 className="main-title">Top playlists</h1>
                <UserPlaylists playlists={this.props.playlists} />
                {this.props.loading && <Loader></Loader>}
                {/!* <button id="start-broadcasting" className="setup">Start Transmitting Yourself!</button>
                <div id="videos-container"></div>*!/}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loading: state.loading,
        playlists: state.playlist
    }
}

// function mapDispatchToProps(dispatch){
// 	return{
// 		loaderOn : dispatch()
// 	}
// }
export default connect(mapStateToProps, {getPlaylists})(userplaylist);*/
