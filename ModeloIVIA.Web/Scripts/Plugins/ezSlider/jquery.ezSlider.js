/*
* File:        jquery.ezSlider.js
* Version:     1.0
* Author:      Danilo Jr (twitter.com/danilojrr)
*/

(function ($) {

    $.ezSlider = {
        defaults: {
            containerClass: 'ezslider',
            wrapperClass: 'ezslider-wrapper',
            slideClass: 'ezslider-slide',
            childrenPadding: undefined
        }
    };

    $.fn.extend({
        ezSlider: function (userConfig) {

            // Properties

            var _that = this;


            // Init

            $.ezSlider.init(_that, userConfig);


            // Methods

            _that.goToPreviousSlide = function () {
                $.ezSlider.goToPreviousSlide(_that.selector);
            };

            _that.goToNextSlide = function () {
                $.ezSlider.goToNextSlide(_that.selector);
            };

            _that.goToSlide = function (slideNumber) {
                $.ezSlider.goToSlide(_that.selector, slideNumber);
            };

            return this;
        }
    });

    $.ezSlider.init = function (container, userConfig) {
        var ezSliderExists = $(container).hasClass($.ezSlider.defaults.containerClass);

        if (!ezSliderExists) {

            var config = (userConfig) ?
                $.extend({}, $.ezSlider.defaults, userConfig) :
                $.ezSlider.defaults;

            config.width = $(container).width();

            $.ezSlider[container.selector] = config;
            $.ezSlider[container.selector].container = $(container);

            $.ezSlider.create(container.selector);
            $.ezSlider.setSlidesNumbers(container.selector);
            $.ezSlider.definePositions(container.selector, $.ezSlider[container.selector].wrapper.children());

            $.ezSlider.goToSlide(container.selector, 1);
        }
    };

    $.ezSlider.create = function (container) {

        var config = $.ezSlider[container];

        $(config.container)
            .addClass(config.containerClass)
            .css({
                position: 'relative',
                overflow: 'hidden'
            });

        var slides = $(config.container).children();

        var wrapper = $('<div></div>').css({
            position: 'relative',
            width: config.width * slides.length
        })
            .addClass(config.wrapperClass)
            .prependTo(config.container);

        config.wrapper = wrapper;

        $(slides).css({
            float: 'left',
            padding: config.childrenPadding,
            width: (config.childrenPadding) ? config.width - (2 * config.childrenPadding) : config.childrenPadding
        })
            .addClass(config.slideClass)
            .appendTo(wrapper);

        $(wrapper).css({
            left: 0
        });

        $(slides).filter(':first').addClass('active');
    };

    $.ezSlider.setSlidesNumbers = function (container) {
        var config = $.ezSlider[container];

        $(config.container).find('.ezslider-slide').each(function (index) {
            $(this).attr('number', index + 1);
        });
    };

    $.ezSlider.definePositions = function (container, slides) {

        var position = 0;

        $.ezSlider[container].slides = {};

        $(slides).each(function (index) {
            var key = 'slide' + (index + 1);
            $.ezSlider[container].slides[key] = { leftPosition: position };
            position -= $.ezSlider[container].width;
        });
    };

    $.ezSlider.goToPreviousSlide = function (container) {
        var config = $.ezSlider[container];

        var activeSlide = $(config.wrapper).find('.active');
        var previousSlide = $(activeSlide).prev();
        if (previousSlide.html()) {
            var previousSlideNumber = previousSlide.attr('number');
            $.ezSlider.goToSlide(previousSlideNumber);
        }
    };

    $.ezSlider.goToNextSlide = function (container) {
        var config = $.ezSlider[container];

        var activeSlide = $(config.wrapper).find('.active');
        var nextSlide = $(activeSlide).next();
        if (nextSlide.html()) {
            var nextSlideNumber = nextSlide.attr('number');
            $.ezSlider.goToSlide(nextSlideNumber);
        }
    };

    $.ezSlider.goToSlide = function (container, slideNumber) {

        var config = $.ezSlider[container];
        var key = "slide" + slideNumber;

        $(config.wrapper).stop().animate({
            left: config.slides[key].leftPosition
        },
        '400', 'swing',
        function () {
            var activeSlide = $(config.container)
                .find('.active')
                .removeClass('active');

            var targetSlide = $('.ezslider-slide[number=' + slideNumber + ']')
                .addClass('active');
        });
    };

})(jQuery);