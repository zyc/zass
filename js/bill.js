$(_ => {
    Util.loadData(e => {
        // BillManager.clear();

        loadContent(e);
        registerTaps();
    });
});

function loadContent(e) {
    // const menu = MenuManager.get(e);
    const bill = BillManager.get();
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