import React from 'react';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import Search from './Search.js';
import Genres from './Genres.js';
import SingleAlbum from './albums/Single.js';
import SingleArtist from './artists/Single.js';
import Playlist from './Player/Playlist.js';
import Home from './Home.js';
import Player from './Player/Player.js';
import Notifications from './Notifications/Notifications.js';
import {connect} from 'react-redux';
import axios from 'axios';
import  Broadcast from './Broadcast/Broadcast';
import Newplaylist from './Newplaylist';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			small_menu: false,
			//access_token: 'BQBCTupsPgT35VROAsem_hEc7-Luwxw5WURtIWBA2r0e9xxBCRNN07WYKLdIvp_tyDlptY-HwQb2t2Fifomi-b1TByLiI3Wt8FQ66OuRmx8opBEdO3Ib4_s_nam_1jt3P2fPTxQp9ZvVh6UHZxb0U3L5U1aBjWZBsCO6mZwHqa6LjVdlCA&refresh_token=AQCBUh6WwPWyPD9UdUgjKXk6slsqkcLwnoDfI127pIeAQKPSoLtuAdw_gDsQJXlI-UYMse2rxq4I_Bg-TAgjUgLNCCIxXVQPsc9w84BFNNO0HKBPCrA9QXkO1TQehMciXoo'
            access_token:null
		}
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	componentDidMount() {
        /*let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${this.state.access_token}`,
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post('https://spoticat-node.herokuapp.com/', axiosConfig)
            .then((response) => {
                this.state.access_token = response.data.token;
                console.log("RESPONSE RECEIVED: ", this.state.access_token);

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })*/
        //let header={headers:{'Authorization':access_token}},{headers: { 'Access-Control-Allow-Origin': '*'}}
        axios.get("https://spoticat-node.herokuapp.com/").then(response => {
			const access_token = response.data.token;
			//console.log(response);
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
			setTimeout(() => this.setState({access_token}), 1);
		});
        window.addEventListener("resize",this.handleResize)
	}
	 handleResize(e){
	 //	const size = e.target.innerWidth;
	 }
	addPlaylist(playlist, currentIndex){
		this.setState({playlist, current: playlist[currentIndex], currentIndex});
	}
	toggleMenu(close){
		this.setState({small_menu: close === true ? false : !this.state.small_menu});
	}
	render(){
		if(!this.state.access_token) return null;

		return(
			<HashRouter>
				<div className="container">
					<div className="content-wrap">
						<Menu toggleMenu={this.toggleMenu} open={this.state.small_menu} />
						<Notifications />
						 <div className={`main-content ${this.state.small_menu ? 'menu-open' : ''} ${this.props.queue.length ? 'player-active' : "active"}`}>
                             <div className="asideButton">
                                 <button className="btn button btn-green btn-small asideButton-button">NEW PLAYLIST</button>
                             </div>
							<Route exact path="/" component={Home} />
							<Player />
	                        <Route path="/queue" component={Playlist} />
							<Route path="/search/:type?" component={Search} />
							<Route path="/genres/:genre?" component={Genres} />
							<Route path="/album/:id?" component={SingleAlbum} />
							<Route path="/artist/:id?" component={SingleArtist} />
						<div className={'join_container'}>
                            <Broadcast></Broadcast>
						</div>
                         </div>
					</div>
				</div>
			</HashRouter>
		);
	}
}
const Menu = (props) => (
	<div className={`menu-wrapper ${props.open ? 'open' : ''}`}>
		<a onClick={props.toggleMenu} className="menu-icon"><div className="hamburger"></div></a>
		{props.open && <div onClick={props.toggleMenu} className="menu-overlay"></div>}
		<nav className="sidebar">
			<div className="small_menu">
				 Logo
			</div>
			<div> Logo
				<ul className="main-menu" onClick={(e) => props.toggleMenu(true)}>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/">Home</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/albums">Albums</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/artists">Artists</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/queue">Queue</NavLink></li>
				</ul>
                <Newplaylist />
			</div>
		</nav>

	</div>
);
function mapStateToProps(state){
	return {
		queue: state.player.queue
	}
}

export default connect(mapStateToProps)(App);
