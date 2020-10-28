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

    const shareButton = document.querySelector('#share');

    if (navigator.share) {

        console.log('entrou');

        shareButton.addEventListener('click', event => {

        // $('#share').on('click', () => {
            var url = location.href;

            if (Global.getParam('o') != 'test') {
                url = url.replace(/o\=\w+/, 'o=share');
            }

            if (navigator.share) {
                await navigator.share({
                    title: window.title,
                    url: url
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch(err => {
                    console.log(`Couldn't share because of`, err.message);
                });
            } else {
                console.log('web share not supported');
            }
        });
    } else {
        $('#share').remove();
    }
});
