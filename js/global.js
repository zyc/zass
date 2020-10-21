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
        $('.group .title span').css('background-image', 'url("images/title-' + e + '.png"');

        if (e === 'mana') {
            $('body').css('background-color', '#414d30');
            $('.container, .container-fluid').css({
                'background-color': '#538bae',
                'color': 'white'
            });
            $('.group .title span').css('color', 'white');
            $('.item.row > div').css('border-bottom', '0.5px dashed white');


        } else if (e === 'capulana') {
            $('body').css('background-color', '#6d3441');
            $('.container, .container-fluid').css({
                'background-color': 'white',
                'color': 'black'
            });
            $('.group .title span').css('color', 'black');
            $('.item.row > div').css('border-bottom', '0.5px dashed black');
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
