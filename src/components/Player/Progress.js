import React from 'react';

class Progress extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			drag: false,
			position: 0
		}
	}

	handleDragStart(e){
		this.setState({drag:true, position: this.props.played});
		const img = document.createElement('img')
		img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		e.dataTransfer.setDragImage(img, 0, 0);
	}

	handleDragEnd(){
		this.props.seekTrack(this.state.position);
		setTimeout(() => this.setState({drag:false}), 200);
	}

	handleDragOver(e){
		if (this.state.drag) this.dragSeek(e);		
	}

	dragSeek(e){
		const start = e.target.offsetParent.getBoundingClientRect().left;
		if (e.pageX === 0) return;
		const offset = e.pageX - start;
		const width = e.target.offsetParent.clientWidth;
		let pos = offset / width;
		pos = Math.min(Math.max(pos, 0), 1);
		this.setState({position: pos});		
	}

	seek(e){
		const offset = e.target.getBoundingClientRect().left
		const clickPosition = e.pageX;
		const seekPos = clickPosition - offset;
		const width = e.target.offsetParent.clientWidth;
		const pos = seekPos / width;
		
		this.props.seekTrack(pos)
	}

	getPos(){
		const pos = this.state.drag ? this.state.position : this.props.played;
		return pos * 100 + "%";
	}

	render(){
		let progress = Math.floor(this.props.played * this.props.duration);
		

		return (
		<div className="progress">
			<div className="progress__time progress__time--current">{progress ? progress : 0}</div>
			<div className="progress__bar" onClick={(e) => this.seek(e)}>
				<div 
			draggable="true"
			onDrag={(e)=> this.handleDragOver(e)}
			onDragStart={(e) => this.handleDragStart(e)}
			onDragEnd={() => this.handleDragEnd()}
			style={{left: this.getPos()}}
			className="knob"></div>
				<div style={{width: this.getPos()}} className="progress__bar-completed"></div>
			</div>
			<div className="progress__time progress__time--total">{this.props.duration}</div>
		</div>
		)
	}
}

export default Progress;