import React from 'react';
import {Link} from 'react-router-dom';

const AlbumItem = props => {
	const image = props.album.images.length ? props.album.images[0].url : "";
	return (
	<div className={`item-list__item album ${props.horizontal && "item-list__item--horizontal"}`}>
		<Link to={`/album/${props.album.id}`}>
			<div className="image-wrapper">
				<i className="icon-music-outline item-list__icon"></i>
				<div className="image-container image-container--shadow" style={{backgroundImage: `url(${image})`}}></div>
			</div>
			<h6 className="item-list__title">{props.album.name}</h6>
		</Link>
	</div>
)};

export default AlbumItem;