$(document).ready(function() {
    $('a.nav-link[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const navHeight = $('#header').outerHeight() || 60;
        const targetId = $(this).attr("href");
        const $target = $(targetId);

        if ($target.length) {
            const targetOffset = $target.offset().top - navHeight - 20;
            $('html, body').animate({ scrollTop: targetOffset }, 420, 'swing');
        }
    });

    const $revealElements = $('.reveal-on-scroll, .reveal-on-scroll-sun');
    
    function checkVisibility() {
        const windowHeight = $(window).height();
        const windowTopPosition = $(window).scrollTop();
        const windowBottomPosition = windowTopPosition + windowHeight;

        $.each($revealElements, function() {
            const $element = $(this);
            const elementTopPosition = $element.offset().top;
            if (elementTopPosition < windowBottomPosition - (windowHeight * 0.15)) {
                $element.addClass('is-visible');
            }
        });
    }
    
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkVisibility, 50);
    });
    checkVisibility(); 

    const $aboutSectionForSlideshow = $('#about .bg-switcher');
    
    if ($aboutSectionForSlideshow.length > 0) {
        const $aboutSection = $('#about');
        const $aboutContent = $('.about-content');
        const bgImages = [];
        $('.bg-switcher').each(function() {
            bgImages.push($(this).data('bg'));
        });

        if (bgImages.length > 0) {
            const firstImage = new Image();
            firstImage.onload = function() {
                $aboutSection.css('background-image', `url(${firstImage.src})`);
                $aboutContent.css('opacity', 1);
                if (bgImages.length > 1) {
                    startSlideshow();
                }
            };
            firstImage.src = bgImages[0];
        }

        let currentBgIndex = 0;
        let bgInterval;

        function changeBackground() {
            currentBgIndex = (currentBgIndex + 1) % bgImages.length;
            const newBgUrl = bgImages[currentBgIndex];
            $aboutSection.css('background-image', `url(${newBgUrl})`);
        }

        function startSlideshow() {
            clearInterval(bgInterval);
            bgInterval = setInterval(changeBackground, 3000);
        }

        $('.bg-switcher').on('click', function() {
            const newBgUrl = $(this).data('bg');
            const clickedIndex = $(this).index();
            if (newBgUrl) {
                $aboutSection.css('background-image', `url(${newBgUrl})`);
                currentBgIndex = clickedIndex;
                if (bgImages.length > 1) {
                    startSlideshow();
                }
            }
        });
    }
});