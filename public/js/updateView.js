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

    var redFontSize = _.toString((red_team_hp / red_team_starting_hp * 30) + 10) + 'pt';
    $('#red_team_hp').css('font-size', redFontSize);
    var blueFontSize = _.toString((blue_team_hp / blue_team_starting_hp * 30) + 10) + 'pt';
    $('#blue_team_hp').css('font-size', blueFontSize);

    let $winner = $('#winner');
    let $winnerTitle = $winner.find('#team_name');

    if (data.winner) {
        $winnerTitle.html((data.winner === 'red_team' ? 'Red Team' : 'Blue Team'));
        $winner.toggleClass('hidden', false);

        $('#blue_team_hit > h1').toggleClass('hidden', true);
        $('#blue_team_hit').toggleClass('hit_highlight', false);
        $('#blue_team_hit').toggleClass('hit_activated', false);
        $('#blue_team_hit > .hit_text').toggleClass('hit_text_hightlight', false);

        $('#red_team_hit > h1').toggleClass('hidden', true);
        $('#red_team_hit').toggleClass('hit_highlight', false);
        $('#red_team_hit').toggleClass('hit_activated', false);
        $('#red_team_hit > .hit_text').toggleClass('hit_text_hightlight', false);
    } else {
        $winner.toggleClass('hidden', true);
        $winnerTitle.html('');
    }
};