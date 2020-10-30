$(() => {
    const i = Util.getItemRef();

    Util.loadData(e => {
        const item = MenuManager.getItem(i, e);
        console.log(item);
        
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