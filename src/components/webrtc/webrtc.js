import React from 'react';
import {connect} from "react-redux";
import RtcViewList from "./index"
class WebRtc extends React.Component {
    render(){
        return(
            <div className="RtcViewList">
                    <RtcViewList
                    tracks={this.props.playlist}
                    addPlaylist={this.props.addPlaylist}
                    current={this.props.current}
                    />
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        playlist : state.player.queue
    }
}
export default connect(mapStateToProps)(WebRtc);

