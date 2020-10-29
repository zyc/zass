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
}

MenuManager.key = "menu_";