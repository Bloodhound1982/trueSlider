/**
 * Created by alex on 20.11.16.
 *
 * @options = {} - collection of all settings
 * @autoplay - integer (seconds)
 * @position - integer (0...items.length)
 *
 */
function TrueSlider(options) {
    var self = this;
    var slider = document.querySelector("[data-slider='slider']");
    var items = slider.querySelectorAll(".slider_item");
    var controls = document.querySelector(".controls");
    var itemsLength = items.length;
    var position = options.position || 0;
    var autoplay = options.autoplay;

    //add .show or .hidden to items
    items.forEach(function(element, index, arr) {
        if (index === position) {
            element.classList.add('show');
            return;
        }
        element.classList.add('hidden');
    });

    //function define slider height, taking item's height
    var sliderHeight = function() {
        var height = Math.max(items[position].offsetHeight,
            items[position].clientHeight,
            items[position].scrollHeight);
        slider.style.height = height + 'px';
    };

    //function for creating prev- or next-buttons
    var btnConstructor = function(btnName) {
        var btn = document.createElement('div');
        btn.classList.add(btnName);
        if (btnName === 'prev') {
            btn.addEventListener('click', self.prev, true);
        }
        if (btnName === 'next') {
            btn.addEventListener('click', self.next, true);
        }
        controls.appendChild(btn);
    };

    //function for generate dots-buttons
    var dotsConstructor = function() {
        var pagination = document.createElement('div');
        pagination.classList.add('.pagination');
        for(var i = 1; i <= itemsLength; i++) {
            var item = document.createElement('div');
            item.innerHTML = i;
            item.classList.add('pag_item');
            pagination.appendChild(item);
        }
        pagination.children.forEach = [].forEach;
        pagination.children.forEach(function(element, index, arr) {
            element.addEventListener('click', function() {
                return move(index);
            }, true);
        });
        controls.appendChild(pagination);
    };

    //start (or not) slide-show
    var startAutoplay = function() {
        if (autoplay) {
            setInterval(self.next, autoplay * 1000);
        }
    };

    //function with logic for moving items
    var move = function(direction) {
        var destination = direction;
        if(direction === itemsLength) destination = 0;
        if(direction === -1) destination = itemsLength - 1;
        var dest = items[destination].classList;
        var current = items[position].classList;

        if (destination === position) return;
        if (position < direction) {
            dest.remove('hidden');
            dest.add('right');
            dest.add('delta_right');
            items[destination].addEventListener('animationend', function(){
                dest.remove('right', 'delta_right');
                current.remove('show');
                current.add('hidden');
                dest.add('show');
            }, true)
            position = destination;

        } else {
            dest.remove('hidden');
            dest.add('left');
            dest.add('delta_left');
            items[destination].addEventListener('animationend', function(){
                dest.remove('left', 'delta_left');
                current.remove('show');
                current.add('hidden');
                dest.add('show');
            }, true)
            position = destination;
        }
    };

    self.next = function () {
        move(position + 1);
    };

    self.prev = function () {
        move(position - 1);
    };

    self.jumpTo = function (destination) {
        if (destination !== position) {
            move(destination);
        }
    };

    // this function wait 0.4s unless item's content is loading
    setTimeout(sliderHeight, 500);

    btnConstructor('prev');
    dotsConstructor();
    btnConstructor('next');

    startAutoplay();

    //doing slider adaptive
    window.addEventListener('resize', sliderHeight, true);
}