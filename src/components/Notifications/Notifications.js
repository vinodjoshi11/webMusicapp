import React from 'react';
import {connect} from 'react-redux';

import {removeNotification} from '../../actions';
import "./styles.css";

class Notifications extends React.Component{
	constructor(props) {
		super(props);
		this.notifications = []
	}

	componentWillReceiveProps(nextProps) {
		this.notifications = Object.keys(nextProps.notifications).map(key => nextProps.notifications[key]) || [];
	}

	remove(i){
		this.props.removeNotification(i);
	}

	render(){
		return(
			<div className="notification-list">
				{this.notifications.map((item, i) => <Notification remove={this.remove.bind(this)} id={item.id} key={i} notification={item} />)}
			</div>
		)
	}
}

class Notification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			state: "enter-start"
		}
	}
	
	componentDidMount() {
		setTimeout(() => this.setState({state: ""}));
		setTimeout(() => {
			if(this.refs.notification) this.setState({state: "leave"})
		}, 4000);
	}


	start(){
		// alert("started");
	}

	end(){
		if (this.state.state === "leave") {
			this.props.remove(this.props.id);
		}
	}

	render(){
		const {notification} = this.props;
		const {state} = this.state;
		return(
			<div onAnimationStart={this.start} onTransitionEnd={() => this.end()} ref="notification" 
			className={`notification notification--${notification.type} ${state}`}
			>
				<p className="notification__text">{notification.text}</p>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		notifications: state.notifications.list
	}
}
export default connect(mapStateToProps, { removeNotification })(Notifications);