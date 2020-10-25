$(function () {
    const e = Global.getEventAlias();

    $.getJSON('data/menu-' + e + '.json')
    .done(data => {
        $('#menu').html(Mustache.render($('#menu-template-1').html(), data));
        
        Global.applyStyle();
    })
    .fail(() => location.href = Global.buildUrl('fail'));

    $('#back').on('click', function() {
        history.back();
    });

    $('#lead').on('click', function() {
        window.open(Global.buildUrl('lead'), '_blank');
    });

    Global.applyStyle();
});