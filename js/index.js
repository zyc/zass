$(() => {
    const e = Util.getEventAlias();

    MenuManager.get(e)
        .done(data => {
            const template = Handlebars.compile($('#menu-template').html());
            $('#menu').html(template(data));

            Util.applyStyle();
        });

    EstablishmentManager.get(e)
        .done(data => {
            const template = Handlebars.compile($('#buttons-template').html());
            const html = template(data.connections);
            $('#buttons').prepend(html);
            // $('#buttons').prepend(template(data));
            // $('#buttons').prepend(template(data));
            // $('#buttons').prepend('<button id="share" type="button" class="connection btn btn-secondary btn-lg btn-block" data-connection="instagram">Ver no Instagram</button>')

            // alert(html);

            $('.connection').on('click', event => {
                const conn = $(event.target).data('connection');
                const url = Util.buildUrl('connection') + '&d=' + conn;

                window.open(url, '_blank');
            });
        });

    // $('.buttons').prepend('<button /><button />');

    $('#order').on('click', event => {
        location.href = Util.buildUrl('order');
    });

    $('#contact').on('click', event => {
        window.open(Util.buildUrl('contact'), '_blank');
    });

    if (navigator.share) {
        var url = location.href;

        if (Util.getParam('o') != 'test') {
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
