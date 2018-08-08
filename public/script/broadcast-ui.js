var config = {
    openSocket: function(config) {
       //var SIGNALING_SERVER = 'http://192.168.1.14:3000/';
        var SIGNALING_SERVER = 'http://localhost:3000/';
        config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var sender = Math.round(Math.random() * 999999999) + 999999999;

        io.connect(SIGNALING_SERVER).emit('new-channel', {
            channel: config.channel,
            sender: sender
        });

        var socket = io.connect(SIGNALING_SERVER + config.channel);
        socket.channel = config.channel;
        socket.on('connect', function() {
            if (config.callback) config.callback(socket);
        });

        socket.send = function(message) {
            socket.emit('message', {
                sender: sender,
                data: message
            });
        };

        socket.on('message', config.onmessage);
    },
    onRemoteStream: function(media) {
        var audio = media.audio;
        audio.setAttribute('controls', true);
        audio.setAttribute('autoplay', true);

        participants.insertBefore(audio, participants.firstChild);

        audio.play();
        rotateAudio(audio);
    },
    onRoomFound: function(room) { console.log(room.broadcaster);
        var alreadyExist = document.getElementById(room.broadcaster);
        if (alreadyExist) return;
        if (typeof roomsList === 'undefined') roomsList = document.body;
        var tr = document.createElement('tr');
        tr.setAttribute('id', room.broadcaster);
        tr.innerHTML = '<td>' + room.roomName + '</td>' +
            '<td><button class="join" id="' + room.roomToken + '">Join Room</button></td>';
        roomsList.insertBefore(tr, roomsList.firstChild);
alert(1);
        tr.onclick = function() {
            tr = this;
            captureUserMedia(function() {
                broadcastUI.joinRoom({
                    roomToken: tr.querySelector('.join').id,
                    joinUser: tr.id
                });
            });
            hideUnnecessaryStuff();
        };
    }
};

function createButtonClickHandler() {

    captureUserMedia(function() {
        broadcastUI.createRoom({
            roomName: (document.getElementById('conference-name') || { }).value || 'Anonymous'
        });

    });
    hideUnnecessaryStuff();
}
function captureUserMedia(callback) {
    //var playlisturl=localStorage.getItem('liveStrem')
    var audio = document.createElement('audio');
    audio.setAttribute('autoplay', true);
    audio.setAttribute('id', 'stremAudio');
    audio.setAttribute('controls', true);
    //audio.setAttribute('src', playlisturl);
    participants.insertBefore(audio, participants.firstChild);
    $('#participants').append(audio)
   var duration = Math.ceil($('audio')[0].duration);
    $('#duration').html(duration);
    getUserMedia({
        video: audio,
        constraints: { audio: true, video: false },
        onsuccess: function(stream) {
            config.attachStream = stream;
            callback && callback();
            //audio.setAttribute('muted', true);
            console.log('sss');
           // rotateAudio(audio);
        },
        onerror: function() {
            alert('unable to get access to your microphone.');
            callback && callback();
        }
    });
}
/* on page load: get public rooms */
var broadcastUI = broadcast(config);
/* UI specific */
var participants = document.getElementById("participants") || document.body;
var startConferencing = document.getElementById('start-conferencing');
var roomsList = document.getElementById('rooms-list');
$('document').ready(() => {
    $('body').on('click', (event) => {
        if (event.target.id == 'start-conferencing') {
              createButtonClickHandler();
            /*var playlisturl=localStorage.getItem('liveStrem')
            var audios = document.createElement('audio');
            audios.setAttribute('autoplay', true);
            audios.setAttribute('controls', true);
            audios.setAttribute('src', playlisturl);
            $('#part').append(audios)*/
        }if (event.target.id == 'conference-name') {
                $('#conference-name').keypress(function() {
                    var text_value = $('#conference-name').val();
                    if (text_value!= '') {
                        $('#start-conferencing').attr('disabled', false);
                    } else {
                        $('#start-conferencing').attr('disabled', true);
                    }
                });
        }

    })

});
 if (startConferencing) startConferencing.onclick = createButtonClickHandler;

function hideUnnecessaryStuff() {
    var visibleElements = document.getElementsByClassName('visible'),
        length = visibleElements.length;
    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'none';
    }
}
/*function rotateAudio(audio) {
    audio.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    setTimeout(function() {
        audio.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
    }, 1000);
}*/
(function() {
    var uniqueToken = document.getElementById('unique-token');
    if (uniqueToken)
        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
})();