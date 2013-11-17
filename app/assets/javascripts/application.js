// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require markerclusterer
//= require hazards
//= require sessions
//= require_self

//Disclosure widget for form
$(document).ready(function() {

  $('.form_disclosure').on('click', function(event) {
    event.preventDefault();
    $(this).next('div').toggleClass('hidden');
    $(this).find('.arrow').toggleClass('arrow-toggle');
  });

  $('#close-sidebar').on('click', function(event) {
    event.preventDefault();
    $('#sidebar').addClass('hidden');
  });

  $('#close').on('click', function(event) {
    event.preventDefault();
    $('#popup').hide();
  });

});