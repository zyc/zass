class BillManager {

    static get() {
        const string = localStorage.getItem(this.key);
        return string != null ? JSON.parse(string) : null;
    }

    static save(bill) {
        localStorage.setItem(this.key, bill == null || bill['count'] === 0 ? null : JSON.stringify(bill));
    }

    static addItem(...items) {
        var bill = this.get();
        bill = (bill == null ? [] : bill);

        for (var item of items) {
            bill.push(item);
        }

        this.save(bill);
    }

    static clear() {
        this.save(null);
    }
}

BillManager.key = "bill";
