var hash = window.location.hash.replace('#', '');
var meeting = new Meeting(hash);
 var remoteMediaStreams = document.getElementById('remote-media-streams');
var localMediaStream = document.getElementById('local-media-stream');
var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
var sender = Math.round(Math.random() * 999999999) + 999999999;
//var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';
var SIGNALING_SERVER = 'http://localhost:3000/';
/*var server = require('http').createServer().listen(3000, '127.0.0.1');
var io = socketIO.listen(server);*/
io.connect(SIGNALING_SERVER).emit('new-channel', {
    channel: channel,
    sender: sender
});
var socket = io.connect(SIGNALING_SERVER + channel);

socket.on('connect', function () {
    // setup peer connection & pass socket object over the constructor!
    console.log('vvvv')
    console.log(socket);

});
socket.send = function (message) {
     console.log(message)
    socket.emit('message', {
        sender: sender,
        data: message
    });
};
socket.Join = function (Join) { console.log(Join);
    socket.emit('Join', {
        sender: sender,
        data: Join
    });
};
/*socket.on('join', function(data){
    console.log(data);
});*/

meeting.openSignalingChannel = function(callback) { // console.log(callback);
    return socket.on('message', callback);
};
// on getting media stream
meeting.onaddstream = function (e) {
    if (e.type == 'local') {
        $('#local-media-stream').append(e.audio)
        $('#setup-new-meeting').hide()
        $('#setup-new-meeting').attr('disabled',true)
        UserName();
    }
    if (e.type == 'remote') $('#remote-media-streams').html(e.audio)
    /*
    if (e.type == 'local') console.log(e.audio); localMediaStream.appendChild(e.audio);
    if (e.type == 'remote') remoteMediaStreams.insertBefore(e.audio, remoteMediaStreams.firstChild);
    */
}
// using firebase for signaling
meeting.firebase = 'rtcweb';
// if someone leaves; just remove his audio
meeting.onuserleft = function(userid) {
    var audio = document.getElementById(userid);
    if (audio) audio.parentNode.removeChild(audio);
};
// check pre-created meeting rooms
meeting.check();
$('document').ready(() => {
    $('body').on('click', (event) => {
        if (event.target.id == 'setup-new-meeting') {
            $('#setup-new-meeting').click(function(){//alert(121);
                var text_value = $('#conference-name').val();
                meeting.setup(text_value);
                UserName();
            });
            // setup new meeting room
            //meeting.setup('meeting room name');
            /* this.disabled = true;
             this.parentNode.innerHTML = '<h2><a href="' + location.href + '" target="_blank">Share this link</a></h2>';*/

        }/*if (event.target.id == 'conference-name') {
            $('#conference-name').keypress(function() {
                var text_value = $('#conference-name').val();
                if (text_value!= '') {
                    $('#local-media-stream').attr('disabled', false);
                }else {
                    $('#local-media-stream').attr('disabled', true);
                }
            });
        }*/

    })
});

function UserName() {
    var visibleElements = document.getElementsByClassName('userName'),
        length = visibleElements.length;
    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'block';
    }
}
/*$('#setup-new-meeting').click(function(){
    io.on('connection', function(socket){
        console.log(socket);
        socket.on('streemURL', function(data){
           console.log(data);
        });
});
});*/
/*document.getElementById('setup-new-meeting').onclick = function() {
    // setup new meeting room
    meeting.setup('meeting room name');
    this.disabled = true;
    this.parentNode.innerHTML = '<h2><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
};*/