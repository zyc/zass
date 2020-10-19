$(function () {
    $.getJSON('data/menu-mana.json' , function(json){
        $('#menu').html(Mustache.render($('#menu-template-1').html(), json));
    });

    $('#order').on('click', function() {
        location.href = Global.buildUrl('order');
    });

    $('#contact').on('click', function() {
        window.open(Global.buildUrl('contact'), '_blank');
    });
});
