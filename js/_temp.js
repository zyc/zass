$(() => {
    if (!Util.isEasterEggActive()) return;

    const e = Util.getEventAlias();

    Util.loadData(e => {
        const data = MenuManager.get(e);
        MenuManager.refElements(data, obj => {
            if (obj.ref != null) refs.push(obj.ref);
        })

        MenuManager.refElements(data, obj => {
            if (obj.ref == null) obj.ref = getUniqueRandom();
        })

        Util.log(data);
    });
});

var refs = [];

function getRandom() {
    const min = 1, max = 9999;

    const len = new String(max).length;
    const rdn = Math.random() * (max - min) + min;

    return new String(rdn.toFixed(0)).padStart(len, '0');
}

function getUniqueRandom() {
    var num = null;

    do {
        num = getRandom();
    } while (refs.includes(num));

    refs.push(num);
    return num;
}