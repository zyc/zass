class EstablishmentManager {

    static get2(e) {
        const jwt = sessionStorage.getItem(this.key + e);
        var json = null;

        if (jwt != null) {
            json = JSON.parse(jwt);
        }

        return json;
    }

    static load(e, done) {
        const result = this.get2(e);

        if (result == null) {
            this.updateFromRemote(e, done);
        } else if (done != null){
            done(result);
        }
    }

    static updateFromRemote(e, done) {
        this.getFromRemote(e)
            .done(data => {
                sessionStorage.setItem(this.key + e, JSON.stringify(data));
                if (done != null) done(data);
            })
            .fail(() => {
                if (done != null) done(null);
            });
    }

    static getFromRemote(e) {
        return $.ajax({
            type: "GET",
            url: 'data/info-' + e + '.json'
        });
    }
}

EstablishmentManager.key = "establishment_";