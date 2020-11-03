$(() => {
    const i = Util.getItemRef();

    Util.loadData(e => {
        const item = MenuManager.getItem(i, e);

        if (Util.isEasterEggActive()) {
            loadItem(e, item);
        }

        $('#back').on('click', event => {
            history.back();
        });

        $('#send').on('click', event => {
            event.preventDefault();

            MenuManager.newOrder(e, {
                "Hora": new Date(),
                "Mesa": "02",
                "Cliente": "Cleverson",
                // "Pedido": item.group.title + ', ' + item.title + `${$('#option').data('obj') != null ? ', ' + getOptionLabel($('#option').data('obj')) : ''}` + `${getPriceLabel($('#price').data('obj')) != '' ? ', ' + getPriceLabel($('#price').data('obj')) : ''}`,
                "Pedido": item.group.title + ', ' + item.title + `${$('#option').data('obj') != null ? ', ' + getOptionLabel($('#option').data('obj')) : ''}` + `${$('#price').data('obj').hint != null ? ', ' + $('#price').data('obj').hint : ''}`,
                "R$": $('#price').data('obj').value,
                "Cod.": nanoid()
            });
        });

        Util.applyStyle();
    });
});

function loadItem(e, item) {
    $('#group-title').text(item.group.title);
    $('#title').text(item.title);

    if (item.description != null) {
        $('#description').text(item.description);
    } else {
        $('#description').remove();
    }

    const options = (item.options != null ? item.options : item.group.options);

    if (options != null) {
        if (options.length > 1) {
            $('#option-la').remove();

            const optionEl = $('#option-sel');
            optionEl.append(`<option disabled selected>Escolha uma opção...</option>`);

            for (var option of options) {
                optionEl.append(`<option value='${option.ref}'>${getOptionLabel(option)}</option>`);
            }

            optionEl.on('change', event => {
                const ref = $(event.currentTarget).val();
                const option = MenuManager.getOption(ref, e);
                var price = null;

                if (option != null) {
                    price = item.prices.find(p => p.hint == option.hint);
                } else if (option == null && $('#price').val() != null && $('#price-sel').length == 0) {
                    setPrice(null);
                }

                setOption(option);

                if (price != null) {
                    setPrice(price);
                }
            });
        } else {
            $('#option-sel').remove();
            setOption(options[0]);
        }
    } else {
        $('#options').remove();
    }

    var prices = item.prices;

    if (options != null && prices.length > 1) {
        prices = prices.filter(p => options.filter(o => o.hint == p.hint).length == 0);
    }

    if (prices.length > 1) {
        const priceEl = $('#price-sel');
        priceEl.append(`<option disabled selected>Escolha uma opção...</option>`);

        for (var price of prices) {
            priceEl.append(`<option value='${price.ref}'>${getPriceLabel(price)}</option>`);
        }

        priceEl.on('change', event => {
            const ref = $(event.currentTarget).val();
            const price = MenuManager.getPrice(ref, e);
            setPrice(price);
        });
    } else {
        $('#price-sel').remove();
        if (prices.length > 0) setPrice(prices[0]);
    }
}

function getPriceLabel(price) {
    return price.hint;
}

function getOptionLabel(option) {
    return `${option.title}${option.hint != null ? ' (' + option.hint + ')' : ''}`;
}

function setOption(option) {
    $('#option').val(option == null ? null : option.ref);
    $('#option').data('obj', option);
    $('#option-la').text(option == null ? '' : getOptionLabel(option));
}

function setPrice(price) {
    $('#price').val(price == null ? null : price.ref);
    $('#price').data('obj', price);
    $('#price-la').text('R$ ' + (price == null ? '0,00' : price.value));
}
