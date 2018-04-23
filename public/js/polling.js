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
            $.ajax(serverUrl + '/game', {
                data: {poll: poll},
                success: function (data) {
                    updateView(data);
                    poll = 1;
                    setTimeout(loop, 1000);
                },
                error: function () {
                    poll = 0;
                    setTimeout(loop, 1000);
                }
            });
        };


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
            })
        });

        loop();

        $('body').on('click', '#blue_team_hit, #red_team_hit', function (evt) {

            var $this = $(this);
            var team = $this.data('team');

            var data = new FormData();
            data.append('team', team);

            $.ajax(serverUrl + '/game/hit', {
                method: 'POST',
                data: data,
                contentType: false,
                processData: false,
                success: updateView
            });

        });

    });

})();
