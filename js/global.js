var Global = {

    eventAlias: null,
    origin: null,

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    },

    getEventAlias: function () {
        if (this.eventAlias == null) {
            this.eventAlias = this.getParam('e');
        }

        return this.eventAlias;
    },

    getOrigin: function () {
        if (this.origin == null) {
            this.origin = this.getParam('o');
        }

        return this.origin;
    },

    buildUrl: function(url) {
        return url + '?e=' + this.getEventAlias() + '&o=' + this.getOrigin();
    },

    applyStyle: function() {
        const e = this.getEventAlias();

        $('.logo img').attr('src', 'images/logo-' + e + '.png');
        $('.header .title span').css('background-image', 'url("images/title-' + e + '.png"');

        var fontBody, fontTitle;

        if (e === 'mana') {
            $('body').css('background-color', '#3f4d2c');
            $('.container, .container-fluid').css({
                'background-color': '#58a8b2',
                'color': 'white'
            });
            $('.table').css('color', 'white');
            $('.header .title span').css('color', '#4E897C');
            $('.items .table .line div').css('border-bottom-color', 'white');

            fontBody = 'Nunito';

        } else if (e === 'capulana') {
            $('body').css('background-color', '#763041');
            $('.container, .container-fluid').css({
                'background-color': '#267952',
                'color': 'white'
            });
            
            $('.table').css('color', 'white');
            $('.header .title span').css('color', '#ee1b29');
            $('.items .table .line div').css('border-bottom-color', 'white');

            fontBody = 'Ubuntu';

        } else if (e === 'sufrango') {
            const text_color = '#45241e';

            $('body').css('background-color', '#FDDD7F');
            $('.container, .container-fluid').css({
                'background-color': '#FEF5DA',
                'color': text_color
            });
            
            $('.table').css('color', text_color);
            $('.header .title span').css('color', 'white');
            $('.items .table .line div').css('border-bottom-color', text_color);

            fontBody = 'Merriweather';

        } else if (e === 'fuego') {
            const text_color = 'black';

            $('body').css('background-color', '#E9EAEB');
            $('.container, .container-fluid').css({
                'background-color': '#E9EAEB',
                'color': text_color
            });
            
            $('.table').css('color', text_color);
            $('.header .title span').css('color', '#DC7300');
            $('.items .table .line div').css('border-bottom-color', text_color);

            // font = 'ZCOOL QingKe HuangYou';
            // font = 'Squada One';
            fontBody = 'Electrolize';
            fontTitle = 'Architects Daughter';
            // fontTitle = 'Gloria Hallelujah';
            // fontTitle = 'Rock Salt';
        }

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
    },

    getFormFilledField: function() {
        const e = this.getEventAlias();
        
        if (e === 'mana') {
            return 'Mana+Rangaria+da+Praia';
        } else if (e === 'capulana') {
            return 'Capulana+Poke+Ceviche';
        } else if (e === 'sufrango') {
            return 'Su+Frango';
        }
    },
}
