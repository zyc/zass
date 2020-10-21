$(function () {
    $('#back').on('click', function() {
        history.back();
    });

    $('#lead').on('click', function() {
        window.open(Global.buildUrl('lead'), '_blank');
    });

    Global.applyStyle();
});