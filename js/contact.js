$(() => {
    setTimeout(() => {
        location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSduPRGZoCUGNSwOE5CiEPxbrwthVuEg1q1AAGFMkWBJL3uAMg/viewform?usp=pp_url&entry.707789577=' + Global.getFormFilledField();
    }, 1500);
});