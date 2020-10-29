$(() => {
    setTimeout(() => {
        location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSeWDSZDaGn3jSvUW2Lvk8SazXgrziOVNeu5imFLPH4EEMjWEg/viewform?usp=pp_url&entry.707789577=' + Util.getFormFilledField();
    }, 1500);
});