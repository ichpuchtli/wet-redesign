jQuery(document).ready(function () {

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoWidth: false,
    mergeFit: true,
    nav: false,
    navText: ['next', 'prev'],
    dots: true,
    dotsEach: false,
    lazyload: false,
    autoplay: true,
    autoplayHoverPause: true,
  });


  $('.mobile-nav-toggle, .mobile-dropdown-toggle').click(function () {

    var $btn = $(this);

    var $navbar = $($btn.data('target'));

    $navbar.slideToggle();

  });

  $(document).mouseup(function (e) {

    // and the thing we've clicked is not a descendent of the dropdown
    var $dropdown = $('.mobile-dropdown-menu');

    if ($dropdown.is(":visible") && $(e.target).parents('.mobile-dropdown').length == 0) {
      $dropdown.hide();
    }

    var $nav_dropdown = $('.mobile-nav');

    if ($(e.target).parents('nav').length == 0) {
      $nav_dropdown.hide();
    }

  });


});