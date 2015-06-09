$(document).ready(function () {

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
    autoplayHoverPause: true
  });


  $('.toggle').click(function () {

    var $toggleBtn = $(this);

    var $toggleTarget = $($toggleBtn.data('target'));

    $toggleTarget.toggleClass('down');
    $toggleTarget.slideToggle();

  });

  // Bind to the mouseup event in the document
  $(document).mouseup(function (event) {

    var $clickTarget = $(event.target);

    var $toggleComponents = $clickTarget.parents('.toggle-target, .toggle');

    // Only hide the menus if the user clicks outside of the range of the menus
    if ($toggleComponents.length === 0) {
      $('.toggle-target.down').slideUp().removeClass('down');
    }

  });

  
  $('a.toggle-thumbnail').click(function() {
    
    var imgURL = $(this).children('img').prop('src');
    
    var captionText = $(this).children('p').text();
    
    var $closeBtn = $('<a href="#" class="close">Close <i class="fa fa-times"></i></a>');
   
    $closeBtn.click(function() {
      $('#preview, #background').remove();
    });
    
    var $img = $('<img src="' + imgURL + '">');
    var $caption = $('<p>' + captionText + '</p>');
    
    var $preview = $('<div id="preview"/>').append($img).append($caption).append($closeBtn);
    
    $preview.click(function() {
      $('#preview, #background').remove();
    });
    
    $('body').append($preview);
    
    $preview.fadeIn();
    
  });

});