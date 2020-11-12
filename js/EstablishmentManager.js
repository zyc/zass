class EstablishmentManager {

    static get(e) {
        // const jwt = Util.getInfoCache(e);
        // var json = null;

        // if (jwt != null) {
        //     json = JSON.parse(jwt);
        // }

        return Util.getInfoCache(e);
    }

    static load(e, done) {
        const result = this.get(e);

        if (result == null) {
            this.updateFromRemote(e, done);
        } else if (done != null) {
            done(result);
        }
    }

    static updateFromRemote(e, done) {
        this.getFromRemote(e)
            .done(data => {
                // sessionStorage.setItem(this.key + e, JSON.stringify(data));
                Util.setInfoCache(e, data);
                if (done != null) done(data);
            })
            .fail(_ => {
                if (done != null) done(null);
            });
    }

    static getFromRemote(e) {
        return $.ajax({
            type: "GET",
            url: 'data/info-' + e + '.json'
        });
    }

    static isFeatureAvailable(e, feature) {
        const establishment = this.get(e)
        const { features } = establishment;

        return (features != null) && (feature != null) && features.includes(feature)
    }
}

EstablishmentManager.key = "establishment_";