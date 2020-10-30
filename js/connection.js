$(() => {
    Util.loadData(e => {
        const dest = Util.getParam('d');
        const establishment = EstablishmentManager.get(e);

        setTimeout(() => {
            const conn = establishment.connections[dest];
            var url = null;

            if (conn != null) {
                url = conn.url;
            }

            if (url == null) {
                url = Util.buildFailUrl();
            }

            location.href = url;

            setTimeout(() => {
                window.close();
            }, 2000);
        }, 1500);
    });
});