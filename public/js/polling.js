(function() {

    var connectionMethod = _.isNil(APP_PARAMS.GAME_SERVER_CONNECTION_METHOD) ? 'poll' : APP_PARAMS.GAME_SERVER_CONNECTION_METHOD;
    if (connectionMethod !== 'poll') {
        // Not socket method, return immediately
        return;
    }
    console.log('Using polling method');

    var serverProtocol = APP_PARAMS.GAME_SERVER_PROTOCOL;
    var serverHost = APP_PARAMS.GAME_SERVER_HOST;
    var serverPort = APP_PARAMS.GAME_SERVER_PORT;
    var serverUrl = serverProtocol + '://' + serverHost + ":" + serverPort;

    $(function () {

        var poll = 0;

        var loop = function () {
            console.log('Sending poll...');
            $.ajax(serverUrl + '/game/poll', {
                method: 'POST',
                data: {poll: poll},
                success: function (data) {
                    poll = 1;
                    updateView(data);
                    console.log('Updated View');
                    console.log(data);
                    setTimeout(loop, 0);
                },
                error: function () {
                    poll = 0;
                    setTimeout(loop, 0);
                }
            });
        };

        loop();


        $('#reset_game').on('click', function () {
            var $this = $(this);
            var team = $this.data('team');

            var data = new FormData();

            $.ajax(serverUrl + '/game', {
                method: 'POST',
                data: data,
                contentType: false,
                processData: false,
                success: updateView
            });
        });

        $('.start_game_button').on('click', function(evt) {
            $.ajax(serverUrl + '/game/start', {
                method: 'POST',
                contentType: false,
                processData: false,
                success: updateView
            });
        });

        $('body').on('click', '#blue_team_hit, #red_team_hit', function (evt) {

            var $this = $(this);
            var team = $this.data('team');

            var data = new FormData();
            data.append('team', team);

            var index = Math.floor((Math.random() * 100 % 3)) + 1;
            var soundFile = 'media/sword' + index + '.mp3';
            var audio = new Audio(soundFile);
            audio.play();

            $.ajax(serverUrl + '/game/attack', {
                method: 'POST',
                data: data,
                contentType: false,
                processData: false,
                success: updateView
            });

        });

    });

})();
