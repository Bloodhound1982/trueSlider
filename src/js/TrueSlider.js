/**
 * Created by alex on 20.11.16.
 *
 * @options = {} - collection of all settings
 * @autoplay - integer (seconds)
 * @position - integer (0...items.length)
 *
 */
function TrueSlider(options) {
    let self = this;
    let slider = document.querySelector("[data-slider='slider']");
    let items = slider.querySelectorAll(".slider_item");
    let controls = document.querySelector(".controls");
    let itemsLength = items.length;
    let position = options.position || 0;
    let autoplay = options.autoplay;

    //add .show or .hidden to items
    items.forEach(function(element, index) {
        if (index === position) {
            element.classList.add('show');
            return;
        }
        element.classList.add('hidden');
    });

    //function define slider height, taking item's height
    let sliderHeight = function() {
        let height = Math.max(items[position].offsetHeight,
            items[position].clientHeight,
            items[position].scrollHeight);
        slider.style.height = height + 'px';
    };

    //function for creating prev- or next-buttons
    let btnConstructor = function(btnName) {
        let btn = document.createElement('div');
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
    let dotsConstructor = function() {
        let pagination = document.createElement('div');
        pagination.classList.add('.pagination');
        for(let i = 1; i <= itemsLength; i++) {
            let item = document.createElement('div');
            item.innerHTML = i;
            item.classList.add('pag_item');
            pagination.appendChild(item);
        }
        pagination.children.forEach = [].forEach;
        pagination.children.forEach(function(element, index) {
            element.addEventListener('click', function() {
                return move(index);
            }, true);
        });
        controls.appendChild(pagination);
    };

    //start (or not) slide-show
    let startAutoplay = function() {
        if (autoplay) {
            setInterval(self.next, autoplay * 1000);
        }
    };

    //function with logic for moving items
    let move = function(futurePosition) {
        let destination = futurePosition;
        if(futurePosition === itemsLength) destination = 0;
        if(futurePosition === -1) destination = itemsLength - 1;
        let dest = items[destination].classList;
        let current = items[position].classList;

        if (destination === position) return;

        return new Promise(function (resolve) {
            if (position < futurePosition) {
                dest.remove('hidden');
                dest.add('right');
                dest.add('delta_right');
                items[destination].addEventListener('animationend', function(){
                    dest.remove('right', 'delta_right');
                    current.remove('show');
                    current.add('hidden');
                    dest.add('show');
                    position = destination;
                    resolve(true);
                }, true);

            } else {
                dest.remove('hidden');
                dest.add('left');
                dest.add('delta_left');
                items[destination].addEventListener('animationend', function(){
                    dest.remove('left', 'delta_left');
                    current.remove('show');
                    current.add('hidden');
                    dest.add('show');
                    position = destination;
                    resolve(false);
                }, true);
            }
        });


    };

    self.next = function () {
        return move(position + 1);
    };

    self.prev = function () {
        return move(position - 1);
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