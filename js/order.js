$(() => {
    Util.loadData(e => {
        Util.applyStyle();

        $('#back').on('click', event => {
            history.back();
        });

        $('#lead').on('click', event => {
            window.open(Util.buildUrl('lead'), '_blank');
        });

        Util.applyStyle();
    });
});