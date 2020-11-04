$(() => {
    Util.loadData(e => {
        loadMenu(e);
        loadButtons(e);
        loadShareButton();

        registerTaps();

        if (Util.isEasterEggActive()) {
            loadEasterEgg();
        } else {
            registerEasterEgg();
        }
    });
});

function loadMenu(e, done) {
    const menu = MenuManager.get(e);

    const template = Handlebars.compile($('#template').html());
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

function registerTaps() {
    $('#exit').on('click', event => {
        deactivateEasterEgg();
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

// *********************
// *    Easter Egg     *
// *********************

function registerEasterEgg() {
    Util.registerEasterEgg($('.logo'), () => {
        loadEasterEgg()
    });
}

function loadEasterEgg() {
    $('#order-container').removeClass('hidden');
    $('#lead-container').remove();

    // $('.ref').css('display', 'inline');
    $('td.chevron').css('display', 'table-cell');
    // $('.hidden').removeClass('hidden');

    $('.items .table tr').css('cursor', 'pointer');

    registerItemTaps();
}

function deactivateEasterEgg() {
    Util.deactivateEasterEgg();
    location.reload();
}