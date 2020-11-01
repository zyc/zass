$(() => {
    Util.loadData(e => {
        loadMenu(e);
        loadButtons(e);
        loadShareButton();

        registerItemTaps();
        registerEasterEgg();
        registerTaps();
    });
});

function loadMenu(e, done) {
    const menu = MenuManager.get(e);
    const template = Handlebars.compile($('#menu-template').html());

    $('#menu').html(template(menu));

    Util.applyStyle();
}

function loadButtons(e) {
    const establishment = EstablishmentManager.get(e);
    const template = Handlebars.compile($('#buttons-template').html());
    const html = template(establishment.connections);

    $('#buttons').prepend(html);

    $('.connection').on('click', event => {
        const conn = $(event.currentTarget).data('connection');
        const url = Util.buildUrl('connection') + '&d=' + conn;

        window.open(url, '_blank');
    });
}

function loadShareButton() {
    if (navigator.share) {
        var url = location.href;

        if (!Util.isTestVersion()) {
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
}

function registerEasterEgg() {
    Util.registerEasterEgg($('.logo'), () => {
        $('.ref').css('display', 'inline');
        $('.hidden').removeClass('hidden');
    });
}

function registerTaps() {
    $('#order').on('click', event => {
        location.href = Util.buildUrl('order');
    });

    $('#contact').on('click', event => {
        window.open(Util.buildUrl('contact'), '_blank');
    });
}

function registerItemTaps() {
    if (!Util.isTestVersion()) {
        $('.items .table tr').css('cursor', 'default');
        return;
    }

    $('.item').on('click', event => {
        const i = $(event.currentTarget).data('ref');
        location.href = Util.buildUrl('order') + '&i=' + i;
    });
}