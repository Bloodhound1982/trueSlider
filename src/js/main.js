"use strict";
(function () {
    let slider = new TrueSlider({});
    document.querySelector('#test')
            .addEventListener('click', function () {
                slider.next().then(result => {
                    console.log(result);
                });
            });
})();