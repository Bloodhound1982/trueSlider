True Slider.

For working with True Slider:
1. Add 'TrueSlider.js' from 'src/js/' to your index.html file
    <script type="text/javascript" src="your_dir/TrueSlider.js"></script>
2. Add 'style.scss' or, if you prefer css, 'style.css' from 'src/css'.
    <link rel="stylesheet" href="your_dir/style.css">
3. Create this markup:
    <div class="container">
        <div data-slider="slider" class="slider">
            <div class="slider_item">inner code</div>
            <div class="slider_item">inner code</div>
            <div class="slider_item">inner code</div>
            <div class="slider_item">inner code</div>
            <div class="slider_item">inner code</div>
            <div class="slider_item">inner code</div>
        </div>
        <div class="controls">
        </div>
    </div>
4. In your .js-file create new instance of True Slider:
    var slider = new Slider();
5. If needs add settings for timing slide-show or default position:
    var slider = new Slider({ position: 3,
                              autoplay: 3 });
    position - number start slide (0 ... length - 1),
    autoplay - delay in seconds between slide.
6. 'style.scss' has two variables:
    $button_color - color shadow and border for control buttons,
    $slider_width - True Slider's width in percent relatively browser width.

