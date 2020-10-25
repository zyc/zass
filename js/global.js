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

        $('.logo').attr('src', 'images/logo-' + e + '.png');
        $('.header .title span').css('background-image', 'url("images/title-' + e + '.png"');

        if (e === 'mana') {
            $('body').css('background-color', '#3f4d2c');
            $('.container, .container-fluid').css({
                'background-color': '#58a8b2',
                'color': 'white'
            });
            $('.table').css('color', 'white');
            $('.header .title span').css('color', '#4E897C');
            $('.items .table .line div').css('border-bottom-color', 'white');

        } else if (e === 'capulana') {
            $('body').css('background-color', '#763041');
            $('.container, .container-fluid').css({
                'background-color': '#3f7755',
                'color': 'white'
            });
            
            $('.table').css('color', 'white');
            $('.header .title span').css('color', '#ee1b29');
            $('.items .table .line div').css('border-bottom-color', 'white');
        }
    },

    getFormFilledField: function() {
        const e = this.getEventAlias();
        
        if (e === 'mana') {
            return 'Mana+Rangaria+da+Praia';
        } else if (e === 'capulana') {
            return 'Capulana+Poke+Ceviche';
        }
    }
}
