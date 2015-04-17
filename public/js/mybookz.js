$(document).ready(function() {
    $('#grimportmodalbtnYes').click(function() {
        alert("data import called!!!");
        window.location = "/auth/goodreads";
    });

    $('.scrollClick').click(function(e){
        e.preventDefault();
        scrollToElement( $(this).attr('scroll-to-id'), 600 );
    });

    var scrollToElement = function(el, ms){
        var speed = (ms) ? ms : 600;
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, speed);
    }
});

