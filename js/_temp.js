$(() => {
    const e = Util.getEventAlias();
    var refs = [];

    MenuManager.get(e).done(data => {
        MenuManager.refElements(data, obj => {
            if (obj.ref != null) refs.push(obj.ref);
        })

        MenuManager.refElements(e, obj => {
            if (obj.ref == null) option.ref = getUniqueRandom(refs);
        })

        console.log(JSON.stringify(data));
    });
});

function getRandom() {
    const min = 1, max = 9999;

    const len = new String(max).length;
    const rdn = Math.random() * (max - min) + min;

    return new String(rdn.toFixed(0)).padStart(len, '0');
}

function getUniqueRandom(refs) {
    var num = null;

    do {
        num = getRandom();
    } while (refs.includes(num));

    refs.push(num);
    return num;
}