$(function () {
    $.getJSON("data/menu.json" , function(json){
        $('#menu').html(Mustache.render($('#menu-template-1').html(), json));
    });
});