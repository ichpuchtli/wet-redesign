
jQuery(document).ready(function(){
  $(".owl-carousel").owlCarousel(
    { 
      items: 1,
      loop: true,
      autoWidth: false,
      mergeFit: true,
      nav: false,
      navText: ['next','prev'],
      dots: true,
      dotsEach: false,
      lazyload: false,
      autoplay: false,
      autoplayHoverPause: true,
    }
  );
});
