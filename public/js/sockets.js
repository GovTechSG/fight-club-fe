(function() {

    var connectionMethod = _.isNil(APP_PARAMS.GAME_SERVER_CONNECTION_METHOD) ? 'poll' : APP_PARAMS.GAME_SERVER_CONNECTION_METHOD;
    if (connectionMethod !== 'socket') {
        // Not socket method, return immediately
        return;
    }
    console.log('Using socket method');

    $(function () {

        var poll = 0;

        let serverProtocol = APP_PARAMS.GAME_SERVER_PROTOCOL;
        let serverHost = APP_PARAMS.GAME_SERVER_HOST;
        let serverPort = APP_PARAMS.GAME_SERVER_PORT;
        let serverUrl = serverProtocol + '://' + serverHost + ":" + serverPort;

        console.log('Connecting to socket ' + serverUrl + '/sockets');
        var socket = io(serverUrl, {path: '/sockets'});
        console.log('Connected ' + socket.connected);

        socket.on('update', updateView);

        socket.emit('refresh');

        socket.on('error', function (err) {
            console.error(err);

            let $error = $('#error');
            let $errorText = $error.find('div.card');

            $errorText.html(err.message);
            $error.toggleClass('hidden', false);
            setTimeout(function () {
                $error.toggleClass('hidden', true);
                $errorText.html('');
            }, 5000);

        });

        $('#reset_game').on('click', function () {
            socket.emit('newGame');
        });

        $('.start_game_button').on('click', function(evt) {
            socket.emit('startGame');
        });

        $('body').on('click', '#blue_team_hit, #red_team_hit', function (evt) {

            let $this = $(this);
            let team = $this.data('team');

            var index = Math.floor((Math.random() * 100 % 3)) + 1;
            var soundFile = 'media/sword' + index + '.mp3';
            var audio = new Audio(soundFile);
            audio.play();

            socket.emit('attack', {team: team});

        });

    });
})();
