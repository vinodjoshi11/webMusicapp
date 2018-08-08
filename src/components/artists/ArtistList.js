import React from 'react';
import ArtistItem from './ArtistItem';

export default function ArtistList(props){
	return(
		<ul className="item-list">
			{props.artists.map((artist,i)=> <ArtistItem artist={artist} key={i} />)}
		</ul>
	)
}