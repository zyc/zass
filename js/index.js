$(_ => {
    Util.loadData(e => {
        loadContent(e);
        loadButtons(e);
        loadShareButton();

        registerTaps();

        if (EstablishmentManager.isFeatureAvailable(e, 'order')) {
            activateOrderFeature();
        }

        if (Util.isEasterEggActive()) {
            loadEasterEgg();
        } else {
            registerEasterEgg();
        }
    });
});

function loadContent(e) {
    const menu = MenuManager.get(e);

    const template = Handlebars.compile($('#template').html());
    $('#content').html(template(menu));

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

        $('#share').on('click', _ => {
            navigator.share({
                title: window.title,
                url: url
            }).then(_ => {
                Util.log('Thanks for sharing!');
            }).catch(err => {
                window.location.reload();
            });
        });
    } else {
        $('#share').remove();
    }
}

function registerTaps() {
    $('#exit').on('click', _ => {
        deactivateEasterEgg();
    });

    $('#contact').on('click', _ => {
        window.open(Util.buildUrl('contact'), '_blank');
    });
}

function registerItemTaps() {
    $('.item').on('click', event => {
        const i = $(event.currentTarget).data('ref');
        location.href = Util.buildUrl('order') + '&i=' + i;
    });
}

// *********************
// *    Easter Egg     *
// *********************

function registerEasterEgg() {
    Util.registerEasterEgg($('.logo'), _ => {
        loadEasterEgg()
        $("html").animate({ scrollTop: $(document).height() - $(window).height() }, _ => {
            setTimeout(_ => {
                alert('Funcionalidades experimentais ativadas 😎')
            }, 150);
        });
    });
}

function loadEasterEgg() {
    $('.hidden').removeClass('hidden');
    activateOrderFeature();
}

function activateOrderFeature() {
    $('td.chevron').css('display', 'table-cell');
    $('.items .table tr').css('cursor', 'pointer');
    registerItemTaps();
}

function deactivateEasterEgg() {
    Util.deactivateEasterEgg();
    location.reload();
}