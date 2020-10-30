class MenuManager {

    static get(e) {
        const jwt = sessionStorage.getItem(this.key + e);
        var json = null;

        if (jwt != null) {
            json = JSON.parse(jwt);
        }

        return json;
    }

    static load(e, done) {
        const result = this.get(e);

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
            url: 'data/menu-' + e + '.json'
        });
    }

    static refElements(json, handler) {
        for (var group of json) {
            if (group.options != null) {
                for (var option of group.options) {
                    handler(option);
                }
            }

            if (group.items != null) {
                for (var item of group.items) {
                    handler(item);

                    if (item.options != null) {
                        for (var option of item.options) {
                            handler(option);
                        }
                    }

                    if (item.prices != null) {
                        for (var price of item.prices) {
                            handler(price);
                        }
                    }
                }
            }
        }
    }
}

MenuManager.key = "menu_";