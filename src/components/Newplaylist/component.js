import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Newplaylist.css';

class Newplaylist extends Component {
  componentWillReceiveProps (nextProps) {
    if(nextProps.userId!== '' && nextProps.token!== '') {
      this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
    }
  }
  renderPlaylists() {
    return this.props.playlistMenu.map(playlist => {
      const getPlaylistSongs= () => {
        this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.token);
        this.props.updateHeaderTitle(playlist.name);
      };
      return (
        <li onClick={ getPlaylistSongs } className={this.props.title === playlist.name ? 'active navigation__list__item' : 'navigation__list__item'} key={ playlist.id }>
          <i className = "ion-ios-musical-notes" ></i> { playlist.name }
        </li>
      );
    });
  }

  render() {
    return (
      <div className='user-playlist-container'>
        <h3 className='user-playlist-header'> <i className="ion-ios-plus-outline"></i> New Playlist</h3>
        <div className= "collapse in" >
        <ul className= "collapse in" >
        {
          this.props.playlistMenu && this.renderPlaylists()
        }
      </ul>
      </div>
    </div>
    );
  }
}

Newplaylist.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
  title: PropTypes.string,
  playlistMenu:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  fetchPlaylistsMenu: PropTypes.func,
  fetchPlaylistSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func
};

export default Newplaylist;
