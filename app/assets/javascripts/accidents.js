//Disclosure widget for form
$(document).ready(function() {

  $('.form_disclosure').on('click', function(event) {
    event.preventDefault();
    // $(this).next('div').toggleClass('hidden');
    // $(this).find('.arrow').toggleClass('arrow-toggle');
    $('.form_disclosure').next('div').toggleClass('hidden');
    $('.form_disclosure').find('.arrow').toggleClass('arrow-toggle');
  });

  $('#close-sidebar').on('click', function(event) {
    event.preventDefault();
    $('#sidebar').addClass('hidden');
  });

  $('#close-modal').on('click', function(event) {
    event.preventDefault();
    $('#popup').hide();
  });

});