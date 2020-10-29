$(() => {
    const e = Global.getEventAlias();

    $.getJSON('data/menu-' + e + '.json')
        .done(data => {
            Global.applyStyle();
        })
        .fail(() => location.href = Global.buildUrl('fail'));

    $('#back').on('click', event => {
        history.back();
    });

    $('#lead').on('click', event => {
        window.open(Global.buildUrl('lead'), '_blank');
    });

    Global.applyStyle();
});