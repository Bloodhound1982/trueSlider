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

    //function for creating prev-button
    var prevConstructor = function() {
        var prev = document.createElement('div');
        prev.classList.add('prev');
        prev.addEventListener('click', self.prev, true);
        controls.appendChild(prev);
    };

    //function for creating next-button
    var nextConstructor = function() {
        var next = document.createElement('div');
        next.classList.add('next');
        next.addEventListener('click', self.next, true);
        controls.appendChild(next);
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
            dest.add('show');
            dest.add('right');
            dest.remove('hidden');
            dest.remove('right');
            current.add('hidden');
            current.remove('show');

            position = destination;
        } else {
            dest.add('show');
            dest.add('left');
            dest.remove('hidden');
            dest.remove('left');
            current.add('hidden');
            current.remove('show');

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

    prevConstructor();
    dotsConstructor();
    nextConstructor();

    startAutoplay();

    //doing slider adaptive
    window.addEventListener('resize', sliderHeight, true);
}