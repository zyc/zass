$(() => {
    const e = Util.getEventAlias();

    var touchArea = $('.logo');
    var region = new ZingTouch.Region(touchArea.parent().get(0));

    region.bind(touchArea.get(0), 'swipe', e => {
        const direction = e.detail.data[0].currentDirection;

        if (direction >= 160 && direction <= 190) {
            $('.ref').css('display', 'none');
        } else if (direction >= 330 && direction <= 360) {
            $('.ref').css('display', 'inline');
        }
    });

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

            $('.connection').on('click', event => {
                const conn = $(event.target).data('connection');
                const url = Util.buildUrl('connection') + '&d=' + conn;

                window.open(url, '_blank');
            });
        });

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
