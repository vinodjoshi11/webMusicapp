import React from 'react';
import {Link} from 'react-router-dom';


const ArtistItem = props => {
	const image = props.artist.images.length ? props.artist.images[1].url : "";
	return(
		<div className="item-list__item grid-item">
			<Link to={`/artist/${props.artist.id}`}>
				<div className="image-wrapper">
					<i className="icon-mic-outline item-list__icon"></i>
					<div className="image-container image-container--shadow" style={{backgroundImage: `url(${image})`}}></div>
				</div>
				<h6 className="item-list__title">{props.artist.name}</h6>
			</Link>
		</div>
	)
};

export default ArtistItem;