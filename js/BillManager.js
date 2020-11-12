class BillManager {

    static get(e) {
        // return Util.getCache(this.context, e);

        const string = localStorage.getItem(e + this.context);
        return string != null ? JSON.parse(string) : null;
    }

    static save(e, bill) {
        localStorage.setItem(e + this.context, bill == null || bill['count'] === 0 ? null : JSON.stringify(bill));
        // return Util.setCache(this.context, e, bill);
    }

    static addItem(e, ...items) {
        var bill = this.get(e);
        bill = (bill == null ? [] : bill);

        for (var item of items) {
            bill.push(item);
        }

        this.save(e, bill);
    }

    static clear(e) {
        this.save(e, null);
    }
}

BillManager.context = "_bill";
