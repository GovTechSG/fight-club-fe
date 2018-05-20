var alreadyPlayedCheers = false;
var updateView = function (data) {

    let blue_team_hp = _.get(data, ['blue_team', 'hp']);
    let red_team_hp = _.get(data, ['red_team', 'hp']);
    let blue_team_starting_hp = _.get(data, ['blue_team', 'starting_hp']);
    let red_team_starting_hp = _.get(data, ['red_team', 'starting_hp']);

    $('#blue_team_hp')
        .css('width', _.toString(_.toInteger(blue_team_hp / blue_team_starting_hp * 100)) + '%')
        .attr('aria-valuenow', _.toString(blue_team_hp))
        .attr('aria-valuemin', _.toString(0))
        .attr('aria-valuemax', _.toString(blue_team_starting_hp))
        .html(_.toString(blue_team_hp));

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
        .html(_.toString(red_team_hp));

    $('#red_team_hp_fill')
        .css('width', _.toString(_.toInteger((red_team_starting_hp - red_team_hp) / red_team_starting_hp * 100)) + '%')
        .attr('aria-valuenow', _.toString(red_team_starting_hp - red_team_hp))
        .attr('aria-valuemin', _.toString(0))
        .attr('aria-valuemax', _.toString(red_team_starting_hp))
        .html(_.toString(red_team_starting_hp - red_team_hp) + ' / ' + _.toString(red_team_starting_hp));


    $('#blue_team_hp_bar').css('width', _.toString(_.toInteger(blue_team_hp / blue_team_starting_hp * 32)) + '%');

    $('#red_team_hp_bar').css('width', _.toString(_.toInteger(red_team_hp / red_team_starting_hp * 32)) + '%');

    var redFontSize = _.toString((red_team_hp / red_team_starting_hp * 30) + 10) + 'pt';
    $('#red_team_hp').css('font-size', redFontSize);
    var blueFontSize = _.toString((blue_team_hp / blue_team_starting_hp * 30) + 10) + 'pt';
    $('#blue_team_hp').css('font-size', blueFontSize);
    var redBloodOpacity = _.toString(1.0 - (red_team_hp / red_team_starting_hp));
    $('.red_team_hit_bg').css('opacity', redBloodOpacity);
    var blueBloodOpacity = _.toString(1.0 - (blue_team_hp / blue_team_starting_hp));
    $('.blue_team_hit_bg').css('opacity', blueBloodOpacity);

    let $winner = $('#winner');
    let $winnerTitle = $winner.find('#team_name');

    if (data.winner) {

        if (!alreadyPlayedCheers) {
            alreadyPlayedCheers = true;
            var soundFile = 'media/cheer.mp3';
            var audio = new Audio(soundFile);
            audio.loop = false;
            audio.play();
        }

        $winnerTitle.html((data.winner === 'red_team' ? 'ORCS WIN!' : 'HEROES WIN!'));
        $winner.toggleClass('hidden', false);
        $('.wrapper-confetti').toggleClass('hidden', false);

        $('#blue_team_hit > h1').toggleClass('invisible', true);
        $('#blue_team_hit').toggleClass('hit_highlight', false);
        $('#blue_team_hit').toggleClass('hit_activated', false);
        $('#blue_team_hit > .hit_text').toggleClass('hit_text_hightlight', false);

        $('#red_team_hit > h1').toggleClass('invisible', true);
        $('#red_team_hit').toggleClass('hit_highlight', false);
        $('#red_team_hit').toggleClass('hit_activated', false);
        $('#red_team_hit > .hit_text').toggleClass('hit_text_hightlight', false);
    } else {
        alreadyPlayedCheers = false;
        $winner.toggleClass('hidden', true);
        $('.wrapper-confetti').toggleClass('hidden', true);
        $winnerTitle.html('');
    }
};