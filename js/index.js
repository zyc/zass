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
        var url = location.href;

        if (Global.getParam('o') != 'test') {
            url = url.replace(/o\=\w+/, 'o=share');
        }

        $('#share').on('click', () => {
            navigator.share({
                title: window.title,
                url: url
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(err => {
                window.location.reload();
            });
        });
    } else {
        $('#share').remove();
    }
});
