$(document).ready(function() {
    $('body').css('display', 'none').fadeIn(1000); 
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let activeOverlay = null;

    function showOverlay(selector) {
        $(selector).stop(true, true).fadeTo(220, 1);
    }

    function hideOverlay(selector) {
        $(selector).stop(true, true).fadeTo(220, 0);
    }

    if (isTouchDevice) {
        $('.cv-luna').on('touchstart', function(e) {
            e.preventDefault();
            if (activeOverlay === '#overlay-luna') {
                hideOverlay(activeOverlay);
                activeOverlay = null;
            } else {
                if (activeOverlay) hideOverlay(activeOverlay);
                showOverlay('#overlay-luna');
                activeOverlay = '#overlay-luna';
            }
        });

        $('.cv-sun').on('touchstart', function(e) {
            e.preventDefault();
            if (activeOverlay === '#overlay-sun') {
                hideOverlay(activeOverlay);
                activeOverlay = null;
            } else {
                if (activeOverlay) hideOverlay(activeOverlay);
                showOverlay('#overlay-sun');
                activeOverlay = '#overlay-sun';
            }
        });

        $(document).on('touchstart', function(e) {
            if (!$(e.target).closest('.cv-frame').length && activeOverlay) {
                hideOverlay(activeOverlay);
                activeOverlay = null;
            }
        });

    } else {
        $('.cv-luna').on('mouseenter focus', function() {
            showOverlay('#overlay-luna');
        }).on('mouseleave blur', function() {
            hideOverlay('#overlay-luna');
        });

        $('.cv-sun').on('mouseenter focus', function() {
            showOverlay('#overlay-sun');
        }).on('mouseleave blur', function() {
            hideOverlay('#overlay-sun');
        });
    }
    $('.cv-frame').on('click', function(e) {
        e.preventDefault(); 
        const destination = $(this).attr('href'); 
        $('body').fadeOut(400, function() {
            window.location.href = destination;
        });
    });
});