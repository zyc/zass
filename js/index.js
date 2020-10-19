$(function () {
    $.getJSON('data/menu-mana.json' , function(json){
        $('#menu').html(Mustache.render($('#menu-template-1').html(), json));
    });

    $('#order').on('click', function() {
        location.href = 'order?e=' + Global.getEventAlias();
    });

    $('#contact').on('click', function() {
        window.open('contact?e=' + Global.getEventAlias(), '_blank');
    });
});
