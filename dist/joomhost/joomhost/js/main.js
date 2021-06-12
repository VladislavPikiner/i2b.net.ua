$(function() {
    $('.slider__content').slick({


        slidesToShow: 2,
        slidesToScroll: 2
    });

    $('.header__burger').on('click', function() {
        $('.menu__list,.header__burger').toggleClass('active');
        $('body').toggleClass('lock');
    })

});