$(function() {
    $(window).scroll(function() {
        let s = $(this).scrollTop();
        let w = $(this).outerWidth();
        let h = $('.content').outerHeight();
        let h_b = $('.parallax').outerHeight();
        let p = s / h * 100;
        let p_b = s / h_b * 100;
        let o = 1 - 1 / 100 * p_b;

        let z_1 = 1 + (w / 10000 * p_b);
        $('.parallax__fog').css('transform', 'scale(' + z_1 + ')');
        $('.parallax__fog').css('opacity', o);

        let z_2 = 1 + (w / 5000000 * p);
        $('.parallax__montain-1').css('transform', 'scale(' + z_2 + ')');

        let hr = w / 2000 * p_b;
        let z_3 = 1 + (w * 0.000005 * p_b);
        $('.parallax__montain-2').css('transform', 'translate3d(' + hr + 'px,0,0) scale(' + z_3 + ')');

        let hr_2 = w / 1500 * p_b;
        let z_4 = 1 + (w * 0.00001 * p_b);
        $('.parallax__montain-3').css('transform', 'translate3d(' + hr_2 + 'px,0,0) scale(' + z_4 + ')');

    });

    $('.button').on('click', function() {
        $('.button').addClass('active');
        $('.neon-title').addClass('active');
    });

    $('.neon-title').on('click', function() {
        $('.button').addClass('active');
        $('.neon-title').addClass('active');
    });

    $('.svg-btn').on('click', function() {
        $('.button').removeClass('active');
        $('.neon-title').removeClass('active');
    });





});

$(function() {
    $("#tel").inputmask({ "mask": "+38(099) 999-99-99" });

});

$('.g-form__input-wrapper').eq(0).on("change", function(e) {
    $('input[type=checkbox]').each(function() {
        if (e.target != this)
            this.checked = false;
    });
})

$('.g-form__input-wrapper').eq(0).on('submit', function() {
    return $('input[type=checkbox]:checked:enabled').length == 1;
});