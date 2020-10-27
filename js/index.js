$(function () {
    const e = Global.getEventAlias();

    $.getJSON('data/menu-' + e + '.json')
        .done(data => {
            const template = Handlebars.compile($('#menu-template').html());
            $('#menu').html(template(data));
            
            Global.applyStyle();
        })
        .fail(() => location.href = Global.buildFailUrl());

    $('#order').on('click', function() {
        location.href = Global.buildUrl('order');
    });

    $('#contact').on('click', function() {
        window.open(Global.buildUrl('contact'), '_blank');
    });
});
