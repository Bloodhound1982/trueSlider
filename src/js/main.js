"use strict";
(function () {
    /*document.addEventListener('load', function() {
        var slider = new TrueSlider({position: 2});
    }, true);*/

    var slider = new TrueSlider({position: 2});

    document.querySelector('.next').addEventListener('click', slider.next, true);
    document.querySelector('.prev').addEventListener('click', slider.prev, true);


})()