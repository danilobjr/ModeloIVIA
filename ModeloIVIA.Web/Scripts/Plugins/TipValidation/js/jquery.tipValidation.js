(function ($) {

    // Default options

    $.tipValidation = {
        defaults: {
            position: 'topRight',
            zIndex: '1000',
            containerClass: 'tipvalidation',
            wrapperClass: 'tipvalidation-wrapper',
            contentClass: 'tipvalidation-content'
        }
    };

    // Initialization

    $.fn.extend({

        tipValidation: function (userConfig) {

            var config = (userConfig) ? $.extend({}, $.tipValidation.defaults, userConfig) : $.tipValidation.defaults;

            $.tipValidation.init(this, config);

            var that = this;

            // Methods

            that.removeAll = function () {
                $.tipValidation.removeAll(this, config);
            };

            that.isValid = function (highlightFields, showTooltipsOnMouseOver) {

                var elements = this;
                var isValid = true;

                $.each(elements, function (i, element) {
                    if ($.tipValidation.isTipvalidationField(element)) {
                        var e = { currentTarget: element };
                        var elementConfig = $.tipValidation.createElementConfig(e, config);
                        var fieldIsValid = $.tipValidation.isValid(elementConfig);

                        if (!fieldIsValid && highlightFields) {
                            $.tipValidation.highlightField(element);
                        }
                        else {
                            $.tipValidation.removeHighlight(element);
                        }

                        if (showTooltipsOnMouseOver) {
                            $.tipValidation.processFocusEvent(elementConfig);
                        }

                        isValid = fieldIsValid && isValid;
                    }
                });

                return isValid;
            };

            that.removeHighlights = function () {
                $.each(that, function (i, element) {
                    $(element)
                        .removeClass('tipvalidation-highlighted')
                        .unbind('focus');
                });
            };

            return that;
        }

    });

    $.tipValidation.isTipvalidationField = function (element) {
        element = $(element);

        if (!element.is('[tipvalidation]') || element.attr('tipvalidation') === '')
            return false;
        else if (!element.hasClass('tipvalidation-source')) {
            element.addClass('tipvalidation-source');
        }

        return true;
    };

    $.tipValidation.init = function (that, config) {
        $.each(that, function (index, element) {
            element = $(element);

            //            if (!element.is('[tipvalidation]') || element.attr('tipvalidation') === '' || element.is('[tipvalidation-link]'))
            //                return element;
            //            else if (!element.hasClass('tipvalidation-source')) {
            //                element.addClass('tipvalidation-source');

            if (!($.tipValidation.isTipvalidationField(element)) || $.tipValidation.alreadyLinkedWithTooltip(element))
                return element;
            else {

                // Event Handlers                

                element.blur(function (e) {
                    setTimeout(function () {
                        $.tipValidation.blurVerification(e, config)
                    }, 70);
                });
            }
        });
    };

    $.tipValidation.createElementConfig = function (e, config) {
        var element = $(e.currentTarget);

        return elementConfig = {
            element: element,
            validations: element.attr('tipvalidation').split('-'),
            validationMessages: [],
            generalConfig: config
        };
    };

    $.tipValidation.blurVerification = function (e, config) {

        var elementConfig = $.tipValidation.createElementConfig(e, config);

        var isValid = $.tipValidation.runValidation(elementConfig);

        if (!isValid) {
            //            if ($.tipValidation.tooltipIsBuilt(elementConfig.element)) {
            //                $.tipValidation.changeTooltipContent(elementConfig);

            //            }
            //            else {
            //                $.tipValidation.removeExistingTooltip(elementConfig);
            //                $.tipValidation.buildToolTip(elementConfig);
            //            }
            $.tipValidation.processTooltipCreation(elementConfig);
        }
        else {
            elementConfig.element.removeClass('tipvalidation-highlighted');
            var elementIdentifier = elementConfig.element.attr('id') || elementConfig.element.attr('name');
            var toolTip = $('.' + config.containerClass + '[tipvalidation-link=' + elementIdentifier + ']');

            if (toolTip.length) {
                toolTip.trigger('hideToolTip');
            }

            elementConfig.element.unbind('focus');
        }
    };

    $.tipValidation.processFocusEvent = function (elementConfig) {
        var element = elementConfig.element;

        var events = element.data('events');

        if (!(events['focus'])) {
            element.focus(function () {
                $.tipValidation.runValidation(elementConfig);
                //                if ($.tipValidation.tooltipIsBuilt(elementConfig.element)) {
                //                    $.tipValidation.changeTooltipContent(elementConfig);
                //                }
                //                else {
                //                    $.tipValidation.removeExistingTooltip(elementConfig);
                //                    $.tipValidation.buildToolTip(elementConfig);
                //                }
                $.tipValidation.processTooltipCreation(elementConfig);
            });
        }
    };

    $.tipValidation.processTooltipCreation = function (elementConfig) {
        if (!($.tipValidation.tooltipIsBuilt(elementConfig.element))) {
            $.tipValidation.removeExistingTooltip(elementConfig);
            $.tipValidation.buildToolTip(elementConfig);
        }
        else if (!($.tipValidation.contentIsSame(elementConfig))) {
            $.tipValidation.removeExistingTooltip(elementConfig);
            $.tipValidation.buildToolTip(elementConfig);
        }
    };

    // Validation methods

    $.tipValidation.runValidation = function (elementConfig) {
        $.tipValidation.clearMessages(elementConfig);

        $.each(elementConfig.validations, function (index, validation) {
            switch (validation) {
                case "required":
                    $.tipValidation.required(elementConfig);
                    break;

                case "minLength":
                    _minLength();
                    break;

                case "date":
                    $.tipValidation.date(elementConfig);
                    break;

                case "email":
                    $.tipValidation.email(elementConfig);
                    break;

                default:
                    if (validation.indexOf("minLength") > -1)
                        $.tipValidation.minLength(elementConfig, validation);
                    else if (validation.indexOf("maxLength") > -1)
                        $.tipValidation.maxLength(elementConfig, validation);
                    else if (validation.indexOf("rangeLength") > -1)
                        $.tipValidation.rangeLength(elementConfig, validation);

                    break;
            }
        });

        //return $.tipValidation.isValid(elementConfig);
        return elementConfig.validationMessages.length === 0;
    };

    $.tipValidation.isValid = function (elementConfig) {
        return $.tipValidation.runValidation(elementConfig);
    };

    $.tipValidation.required = function (elementConfig) {
        var isValid = $.tipValidation.isEmpty(elementConfig) ? false : true;
        if (!isValid)
            elementConfig.validationMessages.push($.tipValidation.rules.required.message);
    };

    $.tipValidation.isEmpty = function (elementConfig) {
        var element = elementConfig.element;

        if (element.is('input[type=text]') || element.is('input[type=password]'))
            return element.val() === '';
        else if (element.is('select'))
            return element.find('option:first').is(':selected');
    };

    $.tipValidation.date = function (elementConfig) {
        var element = elementConfig.element;
        var isValid = $.tipValidation.isValidDate(element);

        if (!isValid)
            elementConfig.validationMessages.push($.tipValidation.rules.date.message);
    };

    $.tipValidation.isValidDate = function (element) {
        var regex = $.tipValidation.rules.date.regex;
        return regex.test(element.val());
    };

    $.tipValidation.email = function (elementConfig) {
        var element = elementConfig.element;
        var isValid = $.tipValidation.isValidEmail(element);

        if (!isValid)
            elementConfig.validationMessages.push($.tipValidation.rules.email.message);
    };

    $.tipValidation.isValidEmail = function (element) {
        var regex = $.tipValidation.rules.email.regex;
        return regex.test(element.val());
    };

    $.tipValidation.minLength = function (elementConfig, validation) {
        var element = elementConfig.element;
        var minLength = parseInt(validation.split('(')[1].replace(')', ''));
        var isValid = $.tipValidation.hasLessThanMinLength(element, minLength) ? false : true;

        if (!isValid) {
            var message = $.tipValidation.rules.minLength.message.replace('{0}', minLength);
            elementConfig.validationMessages.push(message);
        }
    };

    $.tipValidation.hasLessThanMinLength = function (element, minCharactersLength) {
        var elementValue = element.val();
        return (elementValue.length < minCharactersLength);
    };

    $.tipValidation.maxLength = function (elementConfig, validation) {
        var element = elementConfig.element;
        var maxLength = parseInt(validation.split('(')[1].replace(')', ''));
        var isValid = $.tipValidation.hasMoreThanMaxLength(element, maxLength) ? false : true;

        if (!isValid) {
            var message = $.tipValidation.rules.maxLength.message.replace('{0}', maxLength);
            elementConfig.validationMessages.push(message);
        }
    };

    $.tipValidation.hasMoreThanMaxLength = function (element, maxCharactersLength) {
        var elementValue = element.val();
        return (elementValue.length > maxCharactersLength);
    };

    $.tipValidation.rangeLength = function (elementConfig, validation) {
        var element = elementConfig.element;
        var minAndMaxCharactersLength = validation.split('(')[1].replace(')', '').split(',');
        var minLength = parseInt(minAndMaxCharactersLength[0]);
        var maxLength = minAndMaxCharactersLength[1];

        if ($.tipValidation.hasLessThanMinLength(element, minLength)) {
            var message = $.tipValidation.rules.minLength.message.replace('{0}', minLength);
            elementConfig.validationMessages.push(message);
        }

        if ($.tipValidation.hasMoreThanMaxLength(element, maxLength)) {
            var message = $.tipValidation.rules.maxLength.message.replace('{0}', maxLength);
            elementConfig.validationMessages.push(message);
        }
    };


    // UI / Creation Methods

    $.tipValidation.linkTooltipAndElement = function (elementConfig) {
        var element = elementConfig.element;
        var toolTip = elementConfig.toolTip;

        var elementIdentifier = element.attr('id') || element.attr('name');

        toolTip.attr('tipvalidation-link', elementIdentifier);
        element.attr('tipvalidation-link', elementIdentifier);
    };

    $.tipValidation.buildToolTip = function (elementConfig) {

        elementConfig.toolTip = null;
        elementConfig.toolTipArrow = null;

        elementConfig.toolTip = $('<div></div>')
          .addClass('tipvalidation')
          .hide();

        elementConfig.toolTipWrapper = $('<div></div>')
          .addClass('tipvalidation-wrapper')
          .appendTo(elementConfig.toolTip);

        $.tipValidation.linkTooltipAndElement(elementConfig);

        var contentBorders = $('<div></div>')
            .addClass('tipvalidation-content-borders')
            .appendTo(elementConfig.toolTipWrapper);

        $('<div></div>')
            .html(elementConfig.validationMessages.join("<br />"))
            .addClass('tipvalidation-content')
            .appendTo(contentBorders);

        elementConfig.toolTipArrow = $('<div></div>')
            .addClass("tipvalidation-arrow-" + elementConfig.generalConfig.position)
            .appendTo(elementConfig.toolTip);

        elementConfig.toolTip.appendTo('body');

        $.tipValidation.applyStylesAndAnimationConfig(elementConfig);

        elementConfig.toolTip.trigger('showToolTip');
    };

    $.tipValidation.generateStylesAndAnimationConfig = function (elementConfig) {

        var element = elementConfig.element;
        var toolTip = elementConfig.toolTip;
        var toolTipArrow = elementConfig.toolTipArrow;
        var position = elementConfig.generalConfig.position;
        var zIndexToolTip = { 'z-index': parseInt(elementConfig.generalConfig.zIndex) };
        var zIndexToolTipArrow = { 'z-index': parseInt(elementConfig.generalConfig.zIndex) + 2 };

        var css = {
            toolTip: {},
            toolTipWrapper: {},
            toolTipArrow: {}
        };

        var animationConfig = {
            ShowAnimationTop: "", ShowAnimationLeft: "",
            HideAnimationTop: "", HideAnimationLeft: "",
            showAnimation: {}, hideAnimation: {}
        };

        switch (position) {

            case "centerRight":

                css.toolTip = {
                    left: element.offset().left + element.outerWidth() + 25 + 'px',
                    top: element.offset().top - toolTip.outerHeight() / 2 + element.outerHeight() / 2 + 'px'
                };

                css.toolTipWrapper = {
                    float: "right"
                };

                css.toolTipArrow = {
                    marginTop: toolTip.outerHeight() / 2 - toolTipArrow.outerHeight() / 2 + 'px'
                };

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.top = "none";

                animationConfig.showAnimation.left = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.top = "none";

                animationConfig.hideAnimation.left = "+=10px";

                break;

            case "topRight":
                css.toolTip = {
                    left: element.offset().left + element.outerWidth() - 40 + 'px',
                    top: element.offset().top - toolTip.outerHeight() - 25 + 'px',
                    height: toolTip.outerHeight() + 13 + 'px'
                };

                css.toolTipWrapper = {
                    float: 'left'
                };

                css.toolTipArrow = {
                    marginTop: toolTip.outerHeight() - 2 + 'px'
                };

                animationConfig.showAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "bottomRight":
                css.toolTip = {
                    top: element.offset().top + toolTip.outerHeight() + 12 + 'px',
                    left: element.offset().left + element.outerWidth() - 40 + 'px',
                    height: toolTip.outerHeight() + 13 + 'px'
                };

                css.toolTipArrow = {
                    marginTop: -(toolTipArrow.outerHeight() + toolTip.outerHeight() - 2) + 'px'
                };

                animationConfig.showAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "topCenter":
                css.toolTip = {
                    top: element.offset().top - toolTip.outerHeight() - 25 + 'px',
                    left: (element.offset().left + element.outerWidth() / 2) - toolTip.outerWidth() / 2 + 'px'
                };

                css.toolTipArrow = {
                    marginTop: -2 + 'px',
                    marginLeft: toolTip.outerWidth() / 2 - toolTipArrow.outerHeight() / 2 + 'px'
                };

                animationConfig.showAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "bottomCenter":
                css.toolTip = {
                    top: element.offset().top + element.outerHeight() + 25,
                    left: (element.offset().left + element.outerWidth() / 2) - toolTip.outerWidth() / 2
                };

                css.toolTipArrow = {
                    marginTop: -toolTipArrow.outerHeight() - toolTip.outerHeight() + 2,
                    marginLeft: toolTip.outerWidth() / 2 - toolTipArrow.outerHeight() / 2
                };

                animationConfig.showAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "topLeft":
                css.toolTip = {
                    top: element.offset().top - toolTip.outerHeight() - 25,
                    left: element.offset().left - element.outerWidth() + 50
                };

                css.toolTipArrow = {
                    marginTop: -2
                };

                animationConfig.showAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "bottomLeft":
                css.toolTip = {
                    top: element.offset().top + toolTip.outerHeight() + 12 + 'px',
                    left: element.offset().left - toolTip.outerWidth() + 40,
                    height: toolTip.outerHeight() + 13 + 'px'
                };

                css.toolTipArrow = {
                    marginTop: -(toolTipArrow.outerHeight() + toolTip.outerHeight() - 2) + 'px'
                };

                animationConfig.showAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;

            case "centerLeft":
                css.toolTip = {
                    left: element.offset().left - element.outerWidth() - 25 + 'px',
                    top: element.offset().top - toolTip.outerHeight() / 2 + element.outerHeight() / 2 + 'px'
                };

                css.toolTipWrapper = {
                    float: "left"
                };

                css.toolTipArrow = {
                    marginTop: toolTip.outerHeight() / 2 - toolTipArrow.outerHeight() / 2 + 'px'
                };

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.top = "none";

                animationConfig.showAnimation.left = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.top = "none";

                animationConfig.hideAnimation.left = "-=10px";

                break;

            default: /* topRight */
                css.toolTip = {
                    left: element.offset().left + element.outerWidth() - 40 + 'px',
                    top: element.offset().top - toolTip.outerHeight() - 25 + 'px',
                    height: toolTip.outerHeight() + 13 + 'px'
                };

                css.toolTipWrapper = {
                    float: 'left'
                };

                css.toolTipArrow = {
                    marginTop: toolTip.outerHeight() - 2 + 'px'
                };

                animationConfig.showAnimation.top = "+=10px";

                if (!window.ActiveXObject)
                    animationConfig.showAnimation.left = "none";

                animationConfig.hideAnimation.top = "-=10px";

                if (!window.ActiveXObject)
                    animationConfig.hideAnimation.left = "none";

                break;
        }

        css.toolTip = $.extend({}, css.toolTip, zIndexToolTip);
        css.toolTipArrow = $.extend({}, css.toolTipArrow, zIndexToolTipArrow);

        return { css: css, animationConfig: animationConfig };
    };

    $.tipValidation.applyStylesAndAnimationConfig = function (elementConfig) {
        var config = $.tipValidation.generateStylesAndAnimationConfig(elementConfig);

        elementConfig.toolTip.css(config.css.toolTip);
        elementConfig.toolTipWrapper.css(config.css.toolTipWrapper);
        elementConfig.toolTipArrow.css(config.css.toolTipArrow);

        elementConfig.toolTip.click(function () {
            $.tipValidation.remove($(this), config.animationConfig.hideAnimation);
        });

        $(elementConfig.toolTip).bind('hideToolTip', function () {
            $.tipValidation.remove($(this), config.animationConfig.hideAnimation);
        });

        elementConfig.toolTip.bind('showToolTip', function () {
            $(this).animate(config.animationConfig.showAnimation,
            {
                queue: false,
                duration: 200
            })
            .fadeIn('fast');
        });
    };


    // Aux methods

    $.tipValidation.clearMessages = function (elementConfig) {
        elementConfig.validationMessages = [];
    };

    $.tipValidation.remove = function (elementToHide, animation) {
        elementToHide
          .animate(animation,
          {
              queue: false,
              duration: 200
          })
          .fadeOut('fast', function () {
              $(this).remove();
          });
    };

    $.tipValidation.removeAll = function (elements, config) {
        elements.each(function (index, element) {
            var elementIdentifier = $(element).attr('id') || $(element).attr('name');
            var toolTip = $('.' + config.containerClass + '[tipvalidation-link=' + elementIdentifier + ']');

            toolTip.fadeOut('fast', function () {
                toolTip.remove();
            });
        });
    };

    $.tipValidation.removeExistingTooltip = function (elementConfig) {
        var elementIdentifier = $(elementConfig.element).attr('id') || $(elementConfig.element).attr('name');
        var toolTip = $('.' + elementConfig.generalConfig.containerClass + '[tipvalidation-link=' + elementIdentifier + ']');

        if (toolTip.length)
            toolTip.trigger('hideToolTip');
    };

    $.tipValidation.highlightField = function (element) {
        $(element).addClass('tipvalidation-highlighted');
    };

    $.tipValidation.removeHighlight = function (element) {
        $(element).removeClass('tipvalidation-highlighted');
    };

    $.tipValidation.alreadyLinkedWithTooltip = function (element) {
        return element.is('[tipvalidation-link]');
    };

    $.tipValidation.tooltipIsBuilt = function (element) {
        if ($.tipValidation.alreadyLinkedWithTooltip(element)) {
            var link = element.attr('tipvalidation-link');
            var tooltip = $('.tipvalidation[tipvalidation-link=' + link + ']');
            return tooltip.is(':visible');
        }
        else {
            return false;
        }
    };

    $.tipValidation.getTooltipByElement = function (element) {
        if ($.tipValidation.tooltipIsBuilt(element)) {
            var link = element.attr('tipvalidation-link');
            return $('.tipvalidation[tipvalidation-link=' + link + ']');
        }

        return undefined;
    };

    $.tipValidation.changeTooltipContent = function (elementConfig) {
        var element = elementConfig.element;
        var messages = elementConfig.validationMessages.join('<br/>');
        var mensagensAntigas = messages.split('<br/>');
        var tooltip = $.tipValidation.getTooltipByElement(element);
        var mensagensAtuais = tooltip.find('.tipvalidation-content').html().split('<br>');

        var alturaOriginalDoConteudoDoTooltip = tooltip.find('.tipvalidation-content').height();
        //tooltip.find('.tipvalidation-content').css('height', alturaOriginalDoConteudoDoTooltip);

        tooltip.find('.tipvalidation-content').html('');
        tooltip.find('.tipvalidation-content').html(messages);

        var quantidadeDeMensagensMudou = (mensagensAntigas.length !== mensagensAtuais.length);

        if (quantidadeDeMensagensMudou) {
            var alturaAposMudancaDeConteudo = tooltip.find('.tipvalidation-content').height();

            if (alturaAposMudancaDeConteudo > alturaOriginalDoConteudoDoTooltip) {
                var diferencaDeAltura = Math.abs(mensagensAntigas.length - mensagensAtuais.length);
                tooltip
                    .animate({
                        top: '-=' + (diferencaDeAltura * 16) + 'px',
                        height: '+=' + (diferencaDeAltura * 16) + 'px'
                    })
                    .find('[class^=tipvalidation-arrow]').animate({
                        marginTop: '+=' + (diferencaDeAltura * 16) + 'px'
                    });
            }
            else {
                var diferencaDeAltura = Math.abs(mensagensAntigas.length - mensagensAtuais.length);
                tooltip
                    .animate({
                        top: '+=' + (diferencaDeAltura * 16) + 'px',
                        height: '-=' + (diferencaDeAltura * 16) + 'px'
                    })
                    .find('[class^=tipvalidation-arrow]').animate({
                        marginTop: '-=' + (diferencaDeAltura * 16) + 'px'
                    });
            }
        }
    };

    $.tipValidation.contentIsSame = function (elementConfig) {
        var element = elementConfig.element;
        var mensagensAntigas = elementConfig.validationMessages;
        var tooltip = $.tipValidation.getTooltipByElement(element);
        var mensagensAtuais = tooltip.find('.tipvalidation-content').html().split('<br>');

        var conteudoAntigo = mensagensAntigas.join('').replace(/\s/g, '');
        var conteudoAtual = mensagensAtuais.join('').replace(/\s/g, '');

        return (conteudoAntigo === conteudoAtual);
    };

})(jQuery);
