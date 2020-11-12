$(_ => {
    Util.loadData(e => {
        // BillManager.clear(e);

        loadContent(e);
        registerTaps();

        Util.applyFontStyle('button');
    });
});

function loadContent(e) {
    // const menu = MenuManager.get(e);
    const bill = BillManager.get(e);
    Util.log(bill);

    const template = Handlebars.compile($('#template').html());
    $('#content').html(template(bill));

    // Util.applyStyle();
}

function registerTaps() {
    $('#back').on('click', _ => {
        history.go(-2);
        // location.href = Util.buildUrl('./');
    });
}