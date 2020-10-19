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
    }
}
