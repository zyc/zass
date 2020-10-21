$(function () {
    const e = Global.getEventAlias();

    $.getJSON('data/menu-' + e + '.json')
        .done(data => {
            $('#menu').html(Mustache.render($('#menu-template-1').html(), data));
            
            Global.applyStyle();
        })
        .fail(() => location.href = Global.buildUrl('fail'));

    $('#order').on('click', function() {
        location.href = Global.buildUrl('order');
    });

    $('#contact').on('click', function() {
        window.open(Global.buildUrl('contact'), '_blank');
    });
});
