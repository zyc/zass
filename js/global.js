var Global = {

    eventAlias: null,

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    },

    getEventAlias: function () {
        if (this.eventAlias == null) {
            this.eventAlias = this.getParam('e');
        }

        return this.eventAlias;
    }
}
