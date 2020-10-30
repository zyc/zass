class MenuManager {

    static get(e) {
        // const jwt = sessionStorage.getItem(this.key + e);
        var json = null;

        // if (jwt != null) {
        //     json = JSON.parse(jwt);
        // }

        if (json == null) {
            const result = this.getFromRemote(e);

            result.done(data => {
                console.log('Menu atualizado');

                // sessionStorage.setItem(this.key + e, JSON.stringify(data));
                return result;
            });

            return result;
        } else {
            return $.when(json);
        }
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