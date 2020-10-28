var Global = {

    eventAlias: null,
    origin: null,

    getParam: name => new URL(document.location).searchParams.get(name),

    getEventAlias: () => {
        if (this.eventAlias == null) {
            this.eventAlias = Global.getParam('e');
        }

        return this.eventAlias;
    },

    getOrigin: () => {
        if (this.origin == null) {
            this.origin = Global.getParam('o');
        }

        return this.origin;
    },

    buildUrl: url => url + '?e=' + Global.getEventAlias() + '&o=' + Global.getOrigin(),

    buildFailUrl: () => Global.buildUrl('fail'),

    applyStyle: () => {
        const e = Global.getEventAlias();

        $.getJSON('data/info-' + e + '.json')
        .done(data => {
            $('.logo img').attr('src', 'images/logo-' + e + '.png');
            $('.header .title span').css('background-image', 'url("images/title-' + e + '.png"');

            $('body').css('background-color', data.layout.bg_color.default);
            $('.container, .container-fluid').css({
                'background-color': data.layout.bg_color.container,
                'color': data.layout.text_color.default
            });
            $('.table').css('color', data.layout.text_color.default);
            $('.header .title span').css('color', data.layout.text_color.title);
            $('.items .table .line div').css('border-bottom-color', data.layout.text_color.default);

            const fontBody = data.layout.font.default;
            const fontTitle = data.layout.font.title;

            if (fontBody != null || fontTitle != null) {
                var fonts = [];
    
                if (fontBody != null) fonts.push(fontBody);
                if (fontTitle != null) fonts.push(fontTitle);
    
                WebFont.load({
                    google: {
                      families: fonts
                    },
                    active: () => {
                        if (fontBody != null) $('body').css('font-family', fontBody);
                        if (fontBody != null) $('.header .title span').css('font-family', fontTitle);
                    }
                  });
            }
        })
        .fail(() => location.href = Global.buildFailUrl());
    },

    getFormFilledField: () => {
        const e = Global.getEventAlias();
        
        if (e === 'mana') {
            return 'Mana+Rangaria+da+Praia';
        } else if (e === 'capulana') {
            return 'Capulana+Poke+Ceviche';
        } else if (e === 'sufrango') {
            return 'Su+Frango';
        } else if (e === 'fuego') {
            return 'Fuego+Cultura+da+Carne';
        }
    },
}
