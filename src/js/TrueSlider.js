/**
 * Created by alex on 20.11.16.
 */
function TrueSlider(options) {
    var slider = document.querySelector("[data-slider='slider']");
    var items = slider.querySelectorAll(".slider_item");
    var itemsLength = items.length;
    var position = options.position || 0;

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

    //function with logic for moving items
    function move(direction) {
        var destination = direction;
        if(direction === itemsLength) destination = 0;
        if(direction === -1) destination = itemsLength - 1;
        var dest = items[destination].classList;
        var current = items[position].classList;

        // if (destination === position) return;
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
    }

    this.next = function () {
        move(position + 1);
    }

    this.prev = function () {
        move(position - 1);
    }


    // this function wait 0.4s during item's content is loading
    setTimeout(sliderHeight, 450);

    //doing slider adaptive
    window.addEventListener('resize', sliderHeight, true);

}