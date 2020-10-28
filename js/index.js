$(() => {
    const e = Global.getEventAlias();

    $.getJSON('data/menu-' + e + '.json')
        .done(data => {
            const template = Handlebars.compile($('#menu-template').html());
            $('#menu').html(template(data));

            Global.applyStyle();
        })
        .fail(() => location.href = Global.buildFailUrl());

    // $('.buttons').prepend('<button /><button />');

    $('#order').on('click', function () {
        location.href = Global.buildUrl('order');
    });

    $('#contact').on('click', function () {
        window.open(Global.buildUrl('contact'), '_blank');
    });

    if (navigator.share) {
        $('#share').on('click', () => {
            var url = location.href;

            if (Global.getParam('o') != 'test') {
                url = url.replace(/o\=\w+/, 'o=share');
            }

            navigator.share({
                title: window.title,
                url: url
            })
        });
    } else {
        $('#share').remove();
    }
});
