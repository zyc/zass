class OrderManager {

    static send(e, json) {
        // Util.log(json);

        // return $.ajax({
        //     type: "GET",
        //     url: 'http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk'
        // });

        return $.ajax({
            type: "POST",
            url: EstablishmentManager.get(e).rest.base_url,
            data: JSON.stringify(json),
            contentType: "application/json"
        });
    }
}

OrderManager.key = "order_";
