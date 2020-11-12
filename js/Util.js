class Util {

    static getParam(name) {
        return new URL(document.location).searchParams.get(name)
    }

    static getEventAlias() {
        if (this.eventAlias == null) {
            this.eventAlias = this.getParam('e');
        }

        return this.eventAlias;
    }

    static getOrigin() {
        if (this.origin == null) {
            this.origin = this.getParam('o');
        }

        return this.origin;
    }

    static getItemRef() {
        if (this.itemRef == null) {
            this.itemRef = this.getParam('i');
        }

        return this.itemRef;
    }

    static buildUrl(url) {
        return url + '?e=' + this.getEventAlias() + '&o=' + this.getOrigin()
    }

    static buildFailUrl() {
        return this.buildUrl('fail')
    }

    static isTestVersion() {
        return this.getOrigin() === 'test' || this.getParam('exp') != null;
    }

    static loadData(done) {
        const e = this.getEventAlias();

        MenuManager.load(e, menu => {
            EstablishmentManager.load(e, establishment => {
                done(e);
                $('button').attr('hidden', false);
            });
        });

        if (!this.isAutoUpdateOn) {
            this.isAutoUpdateOn = true;

            setInterval(_ => {
                console.log('sync');
                MenuManager.updateFromRemote(e);
                EstablishmentManager.updateFromRemote(e);
            }, 60 * 2 * 1000);
        }
    }

    static handle404() {
        location.href = this.buildFailUrl();
    }

    static applyStyle() {
        const e = this.getEventAlias();
        const establishment = EstablishmentManager.get(e);

        $('.logo img').attr('src', 'image/logo-' + e + '.png');
        $('.header .title span').css('background-image', 'url("image/title-' + e + '.png"');

        $('body').css('background-color', establishment.layout.bg_color.default);
        $('.container, .container-fluid').css({
            'background-color': establishment.layout.bg_color.container,
            'color': establishment.layout.text_color.default
        });
        $('.table').css('color', establishment.layout.text_color.default);
        $('.header .title span').css('color', establishment.layout.text_color.title);
        $('.items .table .line div').css('border-bottom-color', establishment.layout.text_color.default);

        const fontBody = establishment.layout.font.default;
        const fontTitle = establishment.layout.font.title;

        if (fontBody != null || fontTitle != null) {
            var fonts = [];

            if (fontBody != null) fonts.push(fontBody);
            if (fontTitle != null) fonts.push(fontTitle);

            WebFont.load({
                google: {
                    families: fonts
                },
                active: _ => {
                    if (fontBody != null) $('body').css('font-family', fontBody);
                    if (fontBody != null) $('.header .title span').css('font-family', fontTitle);
                }
            });
        }
    }

    static isEasterEggActive() {
        const value = sessionStorage.getItem(this.easterEggKey);
        return value == null ? false : value;
    }

    static registerEasterEgg(el, activated) {
        var count = 0;
        var isTimeoutActive = false;

        el.on('click', event => {
            count++;
            if (count > 5) {
                if (confirm('Ativando funcionalidades experimentais 🧪')) {
                    sessionStorage.setItem(this.easterEggKey, true);
                    activated();
                }
            }

            if (!isTimeoutActive) {
                isTimeoutActive = true;

                setTimeout(_ => {
                    count = 0;
                    isTimeoutActive = false;
                }, 1000);
            }
        });
    }

    static deactivateEasterEgg() {
        sessionStorage.removeItem(this.easterEggKey);
        alert('Tudo normal novamente 👍');
    }

    static setMenuCache(e, json) {
        this.setCache('menu', e, json);
    }

    static getMenuCache(e) {
        return this.getCache('menu', e);
    }

    static setInfoCache(e, json) {
        this.setCache('info', e, json);
    }

    static getInfoCache(e) {
        return this.getCache('info', e);
    }

    static setCache(key, e, object) {
        this.cache[key][e] = (object == null ? null : JSON.stringify(object, null, '  '));
        Util.log(`${key} ${e} atualizado no cache`);
    }

    static getCache(key, e) {
        var string = this.cache[key][e];
        return string == null ? null : JSON.parse(string);
    }

    static getFormFilledField() {
        const e = this.getEventAlias();

        if (e === 'mana') {
            return 'Mana+Rangaria+da+Praia';
        } else if (e === 'capulana') {
            return 'Capulana+Poke+Ceviche';
        } else if (e === 'sufrango') {
            return 'Su+Frango';
        } else if (e === 'fuego') {
            return 'Fuego+Cultura+da+Carne';
        }
    }

    static log(data) {
        console.log(typeof data === "object" ? JSON.stringify(data, null, '  ') : data);
    }
}

Util.eventAlias = null;
Util.origin = null;
Util.itemRef = null;
Util.easterEggKey = 'easter_egg_active';
Util.isAutoUpdateOn = false;
Util.cache = {
    info: {},
    menu: {}
};

$.ajaxSetup({
    error: function (request) {
        switch (request.status) {
            case 404:
                Util.handle404();
                break;
        }
    }
});

if (Handlebars != null) {
    Handlebars.registerHelper('notSingle', function (obj, options) {
        if (obj != null && obj.length != null) {
            if (obj.length > 1) {
                return options.fn(this)
            } else if (obj.length == 1) {
                return options.inverse(this);
            }
        }
    });
}
