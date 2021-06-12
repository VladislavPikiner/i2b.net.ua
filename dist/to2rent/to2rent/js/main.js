$(function() {
    $('.slider').slick({
        arrows: true,
        prevArrow: '<button class = "slick-arrow slick-prev"> <img src = "images/arrow-left.svg" alt="arrow"></button>',
        nextArrow: '<button class = "slick-arrow slick-next"> <img src = "images/arrow-right.svg" alt = "arrow"></button>',
        responsive: [{
            breakpoint: 441,
            settings: {
                arrows: false
            }
        }]
    })

});