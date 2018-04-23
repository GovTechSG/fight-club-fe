(function() {

    var connectionMethod = _.isNil(APP_PARAMS.GAME_SERVER_CONNECTION_METHOD) ? 'poll' : APP_PARAMS.GAME_SERVER_CONNECTION_METHOD;
    if (connectionMethod !== 'poll') {
        // Not socket method, return immediately
        return;
    }
    console.log('Using polling method');

    var update = function (data) {

        let blue_team_hp = _.get(data, ['blue_team', 'hp']);
        let red_team_hp = _.get(data, ['red_team', 'hp']);
        let blue_team_starting_hp = _.get(data, ['blue_team', 'starting_hp']);
        let red_team_starting_hp = _.get(data, ['red_team', 'starting_hp']);

        $('#blue_team_hp')
            .css('width', _.toString(_.toInteger(blue_team_hp / blue_team_starting_hp * 100)) + '%')
            .attr('aria-valuenow', _.toString(blue_team_hp))
            .attr('aria-valuemin', _.toString(0))
            .attr('aria-valuemax', _.toString(blue_team_starting_hp))
            .html(_.toString(blue_team_hp) + ' / ' + _.toString(blue_team_starting_hp));

        $('#blue_team_hp_fill')
            .css('width', _.toString(_.toInteger((blue_team_starting_hp - blue_team_hp) / blue_team_starting_hp * 100)) + '%')
            .attr('aria-valuenow', _.toString(blue_team_starting_hp - blue_team_hp))
            .attr('aria-valuemin', _.toString(0))
            .attr('aria-valuemax', _.toString(blue_team_starting_hp))
            .html(_.toString(blue_team_starting_hp - blue_team_hp) + ' / ' + _.toString(blue_team_starting_hp));

        $('#red_team_hp')
            .css('width', _.toString(_.toInteger(red_team_hp / red_team_starting_hp * 100)) + '%')
            .attr('aria-valuenow', _.toString(red_team_hp))
            .attr('aria-valuemin', _.toString(0))
            .attr('aria-valuemax', _.toString(red_team_starting_hp))
            .html(_.toString(red_team_hp) + ' / ' + _.toString(red_team_starting_hp));

        $('#red_team_hp_fill')
            .css('width', _.toString(_.toInteger((red_team_starting_hp - red_team_hp) / red_team_starting_hp * 100)) + '%')
            .attr('aria-valuenow', _.toString(red_team_starting_hp - red_team_hp))
            .attr('aria-valuemin', _.toString(0))
            .attr('aria-valuemax', _.toString(red_team_starting_hp))
            .html(_.toString(red_team_starting_hp - red_team_hp) + ' / ' + _.toString(red_team_starting_hp));

        $('#blue_team_hp_bar').css('width', _.toString(_.toInteger(blue_team_hp / blue_team_starting_hp * 32)) + '%');

        $('#red_team_hp_bar').css('width', _.toString(_.toInteger(red_team_hp / red_team_starting_hp * 32)) + '%');


        let $winner = $('#winner');
        let $winnerTitle = $winner.find('#team_name');

        if (data.winner) {
            $winnerTitle.html((data.winner === 'red_team' ? 'Red Team' : 'Blue Team'));
            $winner.toggleClass('hidden', false);
        } else {
            $winner.toggleClass('hidden', true);
            $winnerTitle.html('');
        }
    };

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
                    update(data);
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
                success: update
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
                success: update
            });

        });

    });

})();
