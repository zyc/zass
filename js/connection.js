$(() => {
    const e = Util.getEventAlias();
    const dest = Util.getParam('d');

    EstablishmentManager.get(e)
        .done(data => {
            setTimeout(() => {
                const conn = data.connections[dest];
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