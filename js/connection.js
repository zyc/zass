$(function () {
    const e = Global.getEventAlias();
    const dest = Global.getParam('d');

    $.getJSON('data/info-' + e + '.json')
    .done(data => {
        setTimeout(() => {
            const conn = data.connections[dest];
            var url = null;

            if (conn != null) {
                url = conn.url;
            }

            if (url == null) {
                url = Global.buildFailUrl();
            }

            location.href = url;

            setTimeout(() => {
                window.close();
            }, 2000);
        }, 1500);
    })
    .fail(() => location.href = Global.buildFailUrl());
});