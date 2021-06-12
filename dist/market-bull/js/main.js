$(function() {
    $('.slider-slick').slick({
        autoplay: 5000,
        dots: false,
        speed: 500,
        fade: true,
        arrows: false,
        cssEase: 'linear'
    });
});


$(function() {

    $('.burger').on('click', (function() {

        $('.burger__span').toggleClass('active');

        console.log('done')
    }))


});