$(function() {

    $('.products__slider').slick({
        prevArrow: '<button class="slider__btn slider__btn-left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></button>',
        nextArrow: '<button class="slider__btn slider__btn-right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.781487 17L8.99988 9L0.781487 1"/></svg></button>',
        infinite: false,
    });


    $('.question__item-title').on('click', function() {
        $('.question__item').removeClass('question__item--active');
        $(this).parent().addClass('question__item--active');


    });

    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        sectionSelector: '.page-section',
        scrollOverflow: true,
        anchors: ['top', 'products', 'benefits', 'specification', 'question', 'contacts'],
        menu: '#header__nav',
    });

    $('.menu__btn').on('click', function() {
        $('.menu__btn').toggleClass('menu__btn--active');
        $('.menu__list').toggleClass('menu__list--active');
    });

    $('.menu__link').on('click', function() {
        $('.menu__btn').removeClass('menu__btn--active');
        $('.menu__list').removeClass('menu__list--active');
    });

});