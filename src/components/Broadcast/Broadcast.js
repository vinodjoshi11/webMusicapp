import React from 'react';
import './Broadcast.css';
import {connect} from "react-redux";
import Joinbroadcast from "./index";
import {addPlaylist} from '../../actions';
var socket = io();
 class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
    }
    submit(e) {
        e.preventDefault();
        if(this.state.text != '') {
            var message = {
                type : 'message',
                text : this.state.text,
                time : 0, // Set by the server
                user : 0, // Set before sending
                currentuser: true
            }
            this.props.onMessageSubmit(message);
            this.setState({ text: '' });
        }

    }
    change(e) {
        this.setState({ text : e.target.value });
    }
    render() {
        return (
            <div className={'TextSend'}>
            <form onSubmit={this.submit}>
                <input autoFocus onChange={this.change} value={this.state.text} placeholder="Your message"/>
                <input type="submit" value="Send" className={'button'} />
            </form>
            </div>
        );
    }
}
class MessageBox extends React.Component {
    render() {
        if(this.props.currentuser == true) {
            return (
                <div className={"currentuser"}>
                    <div  > {this.props.text} </div>
                    <br/>
                    <div> {this.props.time} </div>
                </div>
            );
        }
        else {
            return (
                <div className={"currentJoinUser"}>
                    <div  > {this.props.text} </div>
                    <br/>
                    <div  > {this.props.time} </div>
                </div>
            );
        }
    }
}
class StatusBox extends React.Component {
    render() {
        return (
            <div className={'status'}>
                {this.props.status} <br/>
                there {this.props.count > 1 ? 'are' : 'is'} {this.props.count} {this.props.count > 1 ? 'participants' : 'User'}
            </div>
        );
    }
}
class MessageList extends React.Component {
    render() {
        const listItems = this.props.messagelist.map((message, i) =>
            {
                if(message.type == 'message') return (
                    <MessageBox key={i} text={message.text} time={message.time} currentuser={message.currentuser} />
                );
                else return (
                    <StatusBox key={i} status={message.status} count={message.count} />
                );
            }
        );
        return (
            <div className={'listItems'}>
                {listItems}
            </div>
        );
    }
}
class Broadcast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages : [], userid : 0, users : 0,liveStream:null};
        this.userAccept = this.userAccept.bind(this);
        this.userJoin = this.userJoin.bind(this);
        this.userLeft = this.userLeft.bind(this);
        this.messageReceive = this.messageReceive.bind(this);
        this.messageSend = this.messageSend.bind(this);
        this.urlReceive = this.urlReceive.bind(this);
        this.StreamUrlSend = this.StreamUrlSend.bind(this);
        this.StreamUserNameReceive = this.StreamUserNameReceive.bind(this);
        this.StreamUserNameSend = this.StreamUserNameSend.bind(this);
    }
    componentDidMount() {
        socket.emit('user:request');
        socket.on('user:accept', this.userAccept);
        socket.on('user:join', this.userJoin);
        socket.on('user:left', this.userLeft);
        socket.on('send:message', this.messageReceive);
        socket.on('send:url', this.urlReceive);
        socket.on('send:userName', this.StreamUserNameReceive);
    }
    componentWillUnmount() {
        socket.emit('user:left');
    }
    userAccept(msg) {
        this.setState({userid: msg.id}); //console.log(this.state.userid);
        var userName=document.getElementById('userName').value;
        if (userName!= '') {console.log('userAccept');
            //this.setState({userid: msg.id});console.log(userid);
            this.setState({users: msg.users});
            var newMessages = this.state.messages;
            newMessages.push({'type': 'status', 'status': 'you joined', 'count': msg.users});
            this.setState({messages: newMessages});
        }
    }
    userJoin() {
        var userName=document.getElementById('userName').value;
        if (userName!= ''){ console.log('someone joined');

            this.setState((prevState, props) => ({users: prevState.users + 1}));
            var newMessages = this.state.messages;
           // var newLiveStream = this.state.liveStream;
            newMessages.push({'type': 'status', 'status': 'someone joined', 'count': this.state.users});
            this.setState({messages: newMessages});
           // this.setState({liveStream: newLiveStream});
        }
    }
    userLeft() {
        var userName=document.getElementById('userName').value;
        if (userName== '') {
            this.setState((prevState, props) => ({users: prevState.users - 1}));
            var newMessages = this.state.messages;
            newMessages.push({'type': 'status', 'status': 'someone left', 'count': this.state.users});
            this.setState({messages: newMessages});
        }
    }
    messageReceive(msg){
     console.log(msg);
        var userName=document.getElementById('userName').value;
        if (userName!= '') {
            if (msg.user == this.state.userid) {
                msg.currentuser = true;
            }
            else {
                msg.currentuser = false;
            }
            var newMessages = this.state.messages;
            newMessages.push(msg);
            this.setState({messages: newMessages});
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
    urlReceive(url){ console.log(this.state.userid);
        var userName=document.getElementById('userName').value;
        if (userName!= '') {
            this.state.liveStream = url;
            var liveStream = this.state.liveStream
            this.setState({url: liveStream});

        }console.log(this.state);
    }
    StreamUserNameReceive(userName){
        console.log(userName)
    }StreamUserNameSend(userName){
        console.log(userName)
    }
    messageSend(message) {
        message.user = this.state.userid;
        socket.emit('send:message', message);
    }
    StreamUrlSend(url) {// console.log(url);
       // url.user = this.state.userid;
        socket.emit('send:url', url);
    }

    render() {
            return (
                <div className={'liveStream'}>
                    <div className={'userJoin'}>
                       <Joinbroadcast tracks={this.props.playlist} addPlaylist={this.props.addPlaylist}
                                       current={this.props.current}/>
                    </div>
                    <div className={'messageSend'} id={'messageSend'}>
                        <div className={'Broadcast'}>
                            <audio id={this.state.userid} autoPlay controls src={this.state.liveStream}/>
                        </div>
                        <MessageList messagelist={this.state.messages}/>
                        <MessageForm onMessageSubmit={this.messageSend}/>
                    </div>
                </div>
            );

    }
}


function mapStateToProps(state){ //console.log(state);
    return {
        playlist : state.player.queue,
        currentuser : state.currentuser,
        status : state.status,
        count : state.count,
        text:state.text,
        time : state.time
    }
}

export default connect(mapStateToProps, {addPlaylist})(Broadcast);
