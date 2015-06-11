//
// Main Javascript File
//


// Bind to the DOMContentLoaded event which is fired when the dom is ready for manipulation
$(document).ready(function () {

  // Owl-Carousel2 carousel library
  // See: http://owlcarousel.owlgraphic.com/
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoWidth: false,
    mergeFit: true,
    nav: false,
    dots: true,
    dotsEach: false,
    lazyload: false,
    autoplay: true,
    autoplayHoverPause: true
  });


  // Generic Toggling event handlers
  // Usage: Add the toggle classic and a data attribute with a selector to the element to toggle
  // <a href="#" class="toggle" data-target="#element">Toggle</a>
  $('.toggle').click(function () {

    var $toggleBtn = $(this);

    var $toggleTarget = $($toggleBtn.data('target'));

    $toggleTarget.toggleClass('down');
    $toggleTarget.slideToggle();

  });

  // Bind to the mouseup event in the document to hide toggled elements
  $(document).mouseup(function (event) {

    // grab a jquery object of the event.target which is the selector of the element
    // underneath the cursor on mouseup
    var $clickTarget = $(event.target);

    var clickInsideToggleTarget = $clickTarget.parents('.toggle-target, .toggle').length > 0;

    // Only hide the menus if the user clicks outside of the range of the menus
    if ($toggleComponents.length === 0) {
      $('.toggle-target.down').slideUp().removeClass('down');
    }

  });


  $('a.toggle-thumbnail').click(function () {

    var imgURL = $(this).children('img').prop('src');

    var captionText = $(this).children('p').text();


    var $img = $('<img src="' + imgURL + '">');
    var $caption = $('<p>' + captionText + '</p>');
    var $closeBtn = $('<a href="#" class="close">Close <i class="fa fa-times"></i></a>');

    var $preview = $('<div id="preview"/>').append($img).append($caption).append($closeBtn);

    $preview.click(function () {
      $('#preview').remove();
    });

    $('body').append($preview);

    $preview.fadeIn();

  });


  $('.require-two-words').keyup(function () {

    var $input = $(this);

    var $error = $input.siblings('.error');

    $error.css('visibility', $input.val().split(' ').length === 2 ? 'hidden' : 'visible');

  });

  $('.require-email').keyup(function () {

    var $input = $(this);

    var $error = $input.siblings('.error');

    $error.css('visibility', /\S+@\S+\.\S+/.test($input.val()) ? 'hidden' : 'visible');

  });

  $('.require-max-400').keyup(function () {

    var $input = $(this);

    var $error = $input.siblings('.error');

    $error.css('visibility', $input.val().length < 400 ? 'hidden' : 'visible');

  });

  $('form#contact').submit(function (e) {

    e.preventDefault();

    $('.dialog').slideToggle();

  });

});