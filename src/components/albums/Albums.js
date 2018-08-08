import React from 'react';
import AlbumItem from './AlbumItem.js';
import './albums.css';

const Albums = props => {
	return (
		<div className="list-wrap">
			<ul className={`albums item-list ${props.horizontal && "item-list--horizontal"}`}>
				{props.albums.map((item, i) => (
					<AlbumItem horizontal={props.horizontal} album={item} key={i} />
				)
				)}
			</ul>
		</div>
	)
}

export default Albums;