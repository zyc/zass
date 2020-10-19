$(function () {
    $('#back').on('click', function() {
        history.back();
    });

    $('#lead').on('click', function() {
        window.open('lead?e=' + Global.getEventAlias(), '_blank');
    });
});