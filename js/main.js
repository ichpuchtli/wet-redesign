//
// Main Javascript File
//

// Bind to the DOMContentLoaded event which is fired when the dom is ready for manipulation
$(document).ready(function () {

  //// Owl-carousel Config ///////////////////////////////////////////////

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


  //// Element Toggling Component ////////////////////////////////////////

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

    // check if the click target is inside one of the toggle targets or the toggle button
    var clickInsideToggleTarget = $clickTarget.parents('.toggle-target, .toggle').length > 0;

    // Only hide the menus if the user clicks outside of the menus
    if (clickInsideToggleTarget === false) {
      $('.toggle-target.down').slideUp().removeClass('down');
    }

  });


  //// Lightbox like image preview ///////////////////////////////////////

  // Usage: add the toggle-thumbnail to any a tag with a child img element to have that image previewed
  $('a.toggle-thumbnail').click(function () {

    // Grab the img url from the descendent image tag of the link
    var imgURL = $(this).children('img').prop('src');

    // Grab the caption from the descendent p tag of the link
    var captionText = $(this).children('p').text();

    // Create new img element in detached/virtual dom
    var $img = $('<img src="' + imgURL + '">');

    // Create new caption paragraph element in detached/virtual dom
    var $caption = $('<p>' + captionText + '</p>');

    // Create new close link a in detached/virtual dom
    var $closeBtn = $('<a href="#" class="close">Close <i class="fa fa-times"></i></a>');

    // Create new image div and append each componenet still in detached/virtual dom
    var $preview = $('<div id="preview"/>').append($img).append($caption).append($closeBtn);

    // bind to the click event on the preview element
    // note this spans the entire page so clicking anywhere close the preview
    // i.e. close button is just for show
    $preview.click(function () {
      $('#preview').remove();
    });

    // finally add the preview to the DOM
    $('body').append($preview);

    // then fade it in as its display:none by default
    $preview.fadeIn();

  });


  //// Form Validation Logic /////////////////////////////////////////////

  // Helper function for toggling an error messages below the contact form inputs.
  // This function binds to the change event on the provided selector and runs the validator
  // function provided upon the change event to determine whether to display/hide error messages.
  var assert = function (selector, validator) {

    // bind to the chang event on the provided selector
    $(selector).change(function () {

      // store the jquery object of this input
      var $input = $(this);

      // find the adjacent .error span element that contains the error messages
      var $error = $input.siblings('.error');

      // grab the value of the input
      var value = $input.val();

      // toggle the visibility css keyword based on the output of the validator
      $error.css('visibility', validator(value) ? 'hidden' : 'visible');

      // toggle the hasError class on the input based on the validator
      // the hasError class is used to determine whether the form can be submitted
      validator(value) ? $input.removeClass('hasError') : $input.addClass('hasError');

    });

  };

  // Generic two word check
  // In this case its used to ensure a full name with first and lastname in the contact form
  var hasTwoWords = function (value) {
    return value.split(' ').length === 2;
  };

  // Basic email check function
  // Regex explaination: match a string '\S+' precending and another proceeding the @ symbol and another proceeding
  // a full stop.
  // in this case its used to ensure a full name with first and lastname
  var isEmail = function (value) {
    return (/\S+@\S+\.\S+/).test(value);
  };

  // Basic maximum charactor check
  var lessThan400chars = function (value) {
    return value.length < 400;
  };

  // bind the following selectors to their corresponding validator function
  assert('.require-two-words', hasTwoWords);
  assert('.require-email', isEmail);
  assert('.require-max-400', lessThan400chars);

  // Form submit event handler
  $('form#contact').submit(function (e) {

    // prevent the default action of creating a post request etc.
    e.preventDefault();

    var $form = $(this);

    // find all inputs and textarea in benath the form and check if any have the .hasError
    // class, if not show our 'Message Sent' dialog otherwise do nothing.
    if (!$form.find('input,textarea').is('.hasError')) {
      $('.dialog').slideToggle();
    }

  });

});