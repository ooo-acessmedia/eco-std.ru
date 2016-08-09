(function ($) {

    'use strict';

    // var cl  = function(msg){
    //     console.log(msg);
    // };

    // Sliders

    $('.product-page-slider').owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        loop: true,
        nav: true,
        navText: ['', '']
    });

    // Fancybox

    $('.fancybox').fancybox();

    // Адативная всплывающая форма

    var $activateButton = $('.site-callout'),
        $formPopup = $('.form-popup'),
        $formFade = $('.form-fade'),
        $formClose = $('.form-popup-close'),
        $formWrap = $('.form-popup-wrap'),
        thisPlaceholder,
        fadeTimeout = 300;

    var activatePopupForm = function (activateButton, formPopup, formFade, formWrap) {
        activateButton.on('click', function () {
            formPopup.add(formFade).addClass('is-visible form-fade-in');
            formWrap.addClass('is-flex');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('form-fade-in');
            }, fadeTimeout);
        });

        formFade.add($formClose).on('click', function () {
            formPopup.add(formFade).addClass('form-fade-out');

            setTimeout(function () {
                formPopup.add(formFade).removeClass('is-visible form-fade-out');
                formWrap.removeClass('is-flex');
            }, fadeTimeout);
        });
    };

    activatePopupForm($activateButton, $formPopup, $formFade, $formWrap);

    // Сменяющиеся плейсхолдеры для формы

    $formPopup.find('input').add($formPopup.add('textarea'))
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

    // Значения даты для формы

    var currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 1);

    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    $('#day').val(currentDay);
    $('#year').val(currentYear);
    $('#month').find('option').eq(currentMonth).attr('selected', 'selected');

    // Линия вложенности у левого меню

    var $leftMenuActiveUl = $('.left-menu .level-01.active > ul'),
        $lastElement = $leftMenuActiveUl.find('> li').last();

    if ($lastElement.position()) {
        var leftMenuLineHeight = $lastElement.position().top + $lastElement.height() / 2;
        var $leftMenuLine = $('<div>').attr('class', 'left-menu-line').css('height', leftMenuLineHeight);
    }

    $leftMenuActiveUl.append($leftMenuLine);
    
    //function setTitleHeight(row) {
    //    var height = 0;
    //    row.forEach(function (item) {
    //        var h = $(item).height();
    //        if(h > height) height = h;
    //    });
    //    height += 36;
    //    row.forEach(function (item) {
    //        var h = $(item).height();
    //        var p = (height + 18 - h)/2;
    //        $(item).css({
    //            'height': (height + 18) + 'px',
    //            'padding-top': (p - 18) + 'px',
    //            'padding-bottom': p + 'px',
    //            'box-sizing': 'border-box'
    //        });
    //    });
    //}
    //
    //var itemRow = [];
    //
    //$('.category-item').each(function (i, item) {
    //    itemRow.push($(item).find('.title'));
    //    if((i + 1) % 2 == 0) {
    //        setTitleHeight(itemRow);
    //        itemRow = [];
    //    }
    //});
    //setTitleHeight(itemRow);




})(jQuery);



