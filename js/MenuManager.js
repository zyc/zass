class MenuManager {

    static get(e) {
        // const jwt = sessionStorage.getItem(this.key + e);
        // var json = null;

        // if (jwt != null) {
        //     json = JSON.parse(jwt);
        // }

        return Util.getMenuCache(e);
    }

    static getPrice(ref, e) {
        return this.getRefElement(ref, e, 'price');
    }

    static getOption(ref, e) {
        return this.getRefElement(ref, e, 'option');
    }

    static getItem(ref, e) {
        var result = null;
        const json = this.get(e);

        var group = json.find(g => {
            result = g.items.find(i => i.ref == ref);
            return result != null
        });

        if (result != null) {
            delete group.items;
            result.group = group;
        }

        return result;
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
                Util.setMenuCache(e, data);
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

    static newOrder(e, json) {
        Util.log(json);

        // return $.ajax({
        //     type: "GET",
        //     url: 'http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk'
        // });

        return $.ajax({
            type: "POST",
            url: EstablishmentManager.get(e).rest.base_url,
            data: JSON.stringify(json),
            contentType: "application/json"
        });
    }

    static getRefElement(ref, e, type) {
        var result = null;
        const json = this.get(e);

        this.refElements(json, (obj, t) => {
            if (ref == obj.ref && type == t) {
                result = obj;
            }
        });

        return result;
    }

    static refElements(json, handler) {
        for (var group of json) {
            if (group.options != null) {
                for (var option of group.options) {
                    handler(option, 'option');
                }
            }

            if (group.items != null) {
                for (var item of group.items) {
                    handler(item, 'item');

                    if (item.options != null) {
                        for (var option of item.options) {
                            handler(option, 'option');
                        }
                    }

                    if (item.prices != null) {
                        for (var price of item.prices) {
                            handler(price, 'price');
                        }
                    }
                }
            }
        }
    }
}

MenuManager.key = "menu_";
