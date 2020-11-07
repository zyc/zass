$(() => {
    const i = Util.getItemRef();

    Util.loadData(e => {
        const item = MenuManager.getItem(i, e);

        if (Util.isEasterEggActive()) {
            loadItem(e, item);
        }

        registerTaps(e, item);

        Util.applyStyle();
        $('body').css('background-color', EstablishmentManager.get(e).layout.bg_color.container);
    });
});

function loadItem(e, item) {
    item._options = (item.options != null ? item.options : item.group.options);

    if (item._options != null && item.prices.length > 1) {
        item._prices = item.prices.filter(p => item._options.filter(o => o.hint == p.hint).length == 0);
    } else {
        item._prices = item.prices;
    }

    item._show_controls = (item._options == null ? 0 : item._options.length) > 1 || (item._prices == null ? 0 : item._prices.length) > 1;
    item._description = `${item.group.description != null ? item.group.description : ''} ${item.description != null ? item.description : ''}`;

    if (item._options != null && item._options.length == 1) {
        item._description = item._description + getOptionLabel(item._options[0]);
    }

    //if (item.prices != null && item.prices.length == 1) setPrice(item.prices[0]);
    item._description = item._description.trim() != '' ? item._description.trim() : null;

    const template = Handlebars.compile($('#template').html());
    $('#order').html(template(item));

    if (item.prices != null && item.prices.length == 1) setPrice(item.prices[0]);
    if (item._options != null && item._options.length == 1) setOption(item._options[0]);

    $('#option-sel').on('change', event => {
        const ref = $(event.currentTarget).val();
        const option = MenuManager.getOption(ref, e);
        var price = null;

        if (option != null) {
            price = item.prices.find(p => p.hint == option.hint);
        } else if (option == null && $('#price').val() != null && $('#price-sel').length == 0) {
            setPrice(null);
        }

        setOption(option);

        if (price != null) setPrice(price);
    });

    $('#price-sel').on('change', event => {
        const ref = $(event.currentTarget).val();
        const price = MenuManager.getPrice(ref, e);

        setPrice(price);
    });

    console.log(JSON.stringify(item, null, '  '));
}

function getPriceLabel(price) {
    return price.hint != null ? price.hint : '';
}

function getOptionLabel(option) {
    return `${option.title}${option.hint != null ? ' (' + option.hint + ')' : ''}`;
}

function setOption(option) {
    // console.log('setOption');
    // console.log(JSON.stringify(option, null, '  '));

    $('#option').val(option == null ? null : option.ref);
    $('#option').data('obj', option);

    // console.log('____');
    // console.log($('#option').data('obj'));
    // console.log('____');


    $('#option-la').text(option == null ? '' : getOptionLabel(option));
}

function setPrice(price) {
    $('#price').val(price == null ? null : price.ref);
    $('#price').data('obj', price);
    $('#price-la').text(price == null ? '0,00' : price.value);
}

function registerTaps(e, item) {
    $('#back').on('click', event => {
        history.back();
    });

    $('.form').on('submit', event => {
        event.preventDefault();

        item.id = nanoid();
        item.option = $('#option').data('obj');
        item.price = $('#price').data('obj');

        const message = validateForm();
        if (message != null) {
            Swal.fire({
                title: message,
                // text: message,
                icon: 'error',
                confirmButtonText: 'Fechar',
                confirmButtonClass: 'btn btn-primary btn-lg btn-block',
                buttonsStyling: false,
                allowEnterKey: false
            })

            return;
        }

        var name = localStorage.getItem('name');

        if (name == null) {
            name = prompt('Qual o seu nome?');
            if (name != null && name.trim() == '') name = null;

            if (name != null) {
                localStorage.setItem('name', name);
            }
        }

        if (name == null) {
            Swal.fire({
                title: 'Que pena',
                text: 'Não podemos receber o pedido sem saber o seu nome',
                icon: 'error',
                confirmButtonText: 'Fechar',
                confirmButtonClass: 'btn btn-primary btn-lg btn-block',
                buttonsStyling: false,
                allowEnterKey: false
            })

            return;
        }

        const data = {
            "Hora": moment().locale('pt-br').format('YYYY-MM-DD HH:mm:ss'),
            "Mesa": "",
            "Cliente": name,
            "Pedido": stringify(item),
            "R$": item.price.value,
            "Cod.": item.id
        }

        Swal.fire({
            title: 'Pedido',
            text: stringify(item),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar o Pedido',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-primary btn-lg btn-block',
            cancelButtonClass: 'btn btn-secondary btn-lg btn-block',
            buttonsStyling: false,
            allowEnterKey: false

        }).then(result => {
            if (result.isConfirmed) {

                $('#overlay').fadeIn();

                MenuManager.newOrder(e, data)
                    .done(data => {
                        Swal.fire({
                            title: 'Pedido enviado',
                            text: 'Levaremos até você quando estiver pronto',
                            icon: 'success',
                            confirmButtonClass: 'btn btn-primary btn-lg btn-block',
                            buttonsStyling: false,
                            allowEnterKey: false

                        }).then(result => {
                            // $('#back').trigger("click");
                            // history.back();
                        });
                    })
                    .fail(jqXHR => {
                        Swal.fire({
                            title: 'Tente outra vez',
                            text: 'Aconteceu uma falha e o seu pedido não foi enviado',
                            icon: 'error',
                            confirmButtonClass: 'btn btn-primary btn-lg btn-block',
                            buttonsStyling: false,
                            allowEnterKey: false
                        })
                    })
                    .always(data => {
                        $('#overlay').fadeOut();
                    });
            }
        })
    });
}

function validateForm() {
    var result = '';
    var errors = [];

    for (var select of $('select')) {
        const el = $(select);

        if (el.val() == null) {
            errors.push(el.children('option:selected').text());
        }
    }

    errors.forEach((el, i) => {
        if (result.indexOf(el) < 0) {
            result = `${result}${i > 0 ? ' e ' : ''}${el}`;
        }
    });

    return result.trim().length > 0 ? result.trim() : null;
}

function stringify(item) {
    var string = item.group.title
        + ': ' + item.title
        + (item.option != null ? ', ' + getOptionLabel(item.option) : '');

    if (item.price != null && item.price.hint != null && string.indexOf(item.price.hint) < 0) {
        string = string + getPriceLabel(item.price);
    }

    return string;
}
