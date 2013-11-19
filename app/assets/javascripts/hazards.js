//inforWindowTemplate thats associated with individual hazard markers
var infoWindowTemplate = _.template('<p data-id="<%= id %>"><strong>'
  + '<%= hazard_type %></strong><br><% if (description) { %><%= description %><br><% } %><small><% var added = new Date(created_at) %>'
  + '<% var year = added.getFullYear(); var day = added.getDate(); var month = added.getMonth(); %>'
  + '<%= year %>-<%= month %>-<%= day %></small></p><p><img src="/assets/upvote.png" alt="Up Vote" class="upvote" data-id="<%= id %>"><%= votes %>'
  + '<img src="/assets/downvote.png" alt="Down Vote" class="downvote" data-id="<%= id %>">'
  + '<% if (CURRENT_USER) { if (CURRENT_USER["id"] === user_id) { %><a href="/hazards/<%= id %>" class="delete" data-method="delete" data-remote="true" rel="nofollow">'
  + 'Delete</a><% } } %></p>');

//prepopulated info from Bay Citizens
var infoWindowTemplateAccidents = _.template('<p><strong>Bicycle Accident</strong>'
  + '<% if (accident_date) { %><br><% var accidentDate = new Date(accident_date) %>'
  + '<% var year = accidentDate.getFullYear(); var day = accidentDate.getDate(); var month = accidentDate.getMonth(); %>'
  + '<%= year %>-<%= month %>-<%= day %><% } %><br><%= details %></p>'
  + '<% if (news_url) { %><a href="<%= news_url %>" target="_blank">News Link</a><% } %>');

//Empty array to be populated
ACCIDENT_DATA = [];
HAZARD_DATA = [];
VOTES = [];
var CURRENT_USER;

var marker;

//call to controller for all database info needed
 var getHazardData = function() {
  $.ajax({
    url: '/hazards.json',
    type: 'GET'
  }).done(function(data) {
    HAZARD_DATA = data['hazards'];
    VOTES = data['votes'];
    CURRENT_USER = data['currentUser'];
    ACCIDENT_DATA = data['accidents'];
    getGeoLocation();
  });
 };
//neccessary lines of code for google map api routes
var map;
var directionsService, directionsDisplay;
//geo loaction of each individual user
var getGeoLocation = function() {
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
//position of current location
  function success(position) {
      userLat = position.coords.latitude;
      userLong = position.coords.longitude;
      INITIALIZE();
  }
//default location if error is found
  function error() {
    userLat = 37.7833;
    userLong = -122.4167;
    INITIALIZE();
  }

  navigator.geolocation.getCurrentPosition(success, error);
};

function INITIALIZE() {
//google map api routes (direction)
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsService = new google.maps.DirectionsService();

  //toogle button for bicycle routes legend
  var controlDiv = document.createElement('DIV');
    $(controlDiv).addClass('gmap-control-container')
                 .addClass('gmnoprint');
  //User interactive toggle button
  var controlUI = document.createElement('DIV');
    $(controlUI).addClass('gmap-control');
    $(controlUI).text('Bicycle Routes');
    $(controlDiv).append(controlUI);
  //content parameters
  var legend = '<ul>'
             + '<li><span id="trail">&nbsp;&nbsp;</span><span> Trails </span></li>'
             + '<li><span id="dedicated-lane">&nbsp;&nbsp;</span><span> Dedicated lanes </span></li>'
             + '<li><span id="friendly">&nbsp;&nbsp;</span><span> Bicycle friendly roads </span></li>'
             + '</ul>';
  //action neccessary to toggle legend event
  var controlLegend = document.createElement('DIV');
    $(controlLegend).addClass('gmap-control-legend');
    $(controlLegend).html(legend);
    $(controlLegend).hide();
    $(controlDiv).append(controlLegend);

  // Set hover toggle event
  $(controlUI)
    .mouseenter(function() {
        $(controlLegend).show();
    })
    .mouseleave(function() {
        $(controlLegend).hide();
    });
    //function for user lat & lng
  var userLatlng = new google.maps.LatLng(userLat, userLong);
  //zoomed in, centering on the latlng above
  var mapOptions = {
    zoom: 13,
    center: userLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //allow us to use maptions and uses id from index.html.erb
  map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  //bikelayer
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  //content info for hazards
  infowindow = new google.maps.InfoWindow();
  newPinInfoWindow = new google.maps.InfoWindow();

  var markersArray = [];
  //marker dropped onto map for hazards
  var hazards, i;
  _.each(HAZARD_DATA, function(hazard) {
    hazards = new google.maps.Marker({
      icon: '/assets/hazard.png',
      position: new google.maps.LatLng(hazard['latitude'], hazard['longitude']),
      animation: google.maps.Animation.DROP,
      map:map
    });
    markersArray.push(hazards);
    google.maps.event.addListener(hazards, 'click', (function(hazards, i) {
      return function() {
        var hazardVotes = _.findWhere(VOTES, {hazard_id: hazard.id});
        hazard['votes'] = hazardVotes['upvotes'];
        infowindow.setContent(infoWindowTemplate(hazard));
        infowindow.open(map, hazards);
      };
    })(hazards, i));
  });

  //marker dropped onto map for accidents
  var deaths, x;
  _.each(ACCIDENT_DATA, function(accident) {
    deaths = new google.maps.Marker({
      icon: '/assets/error.png',
      position: new google.maps.LatLng(accident['latitude'], accident['longitude']),
      animation: google.maps.Animation.DROP,
      map: map
  });
    markersArray.push(deaths);
    google.maps.event.addListener(deaths, 'click', (function(deaths, x) {
      return function() {
        infowindow.setContent(infoWindowTemplateAccidents(accident));
        infowindow.open(map, deaths);
      };
    })(deaths, x));
  });
//optional code to change cluster icons
var clusterStyles = [
 {height: 60,
    url: "http://blendmein.com/collections2/entypo-entypo/light%20up.png",
    width: 60,
    textSize: 10
},
 {height: 60,
    url: "http://blendmein.com/collections2/entypo-entypo/light%20up.png",
    width: 60,
    textSize: 10
},
    {height: 60,
    url: "http://blendmein.com/collections2/entypo-entypo/light%20up.png",
    width: 60,
    textSize: 10
}];

  var mcOptions = {gridSize: 50, maxZoom: 15}; //needs to add clusterstyle

  //options for markerclusterer
  var mcOptions = {gridSize: 100, maxZoom: 15}; //needs to add clusterstyle
  //function that calls for markerclusterer

  var mc = new MarkerClusterer(map,markersArray, mcOptions);

  //console.log(mc);

  //append toogle button to the top right of map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

//end of initalize function
}
//function to calculate routes
function calcRoute() {

  var request = {
    origin: document.getElementById("origin").value,
    destination: document.getElementById("destination").value,
    travelMode: google.maps.TravelMode.BICYCLING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

//function that sets the values for new user generated marker
function userMarker(location) {
  if (marker) {
    clearMarker(marker);
  }
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.ob, location.pb),
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP
  });
  setForm(marker.getPosition().ob, marker.getPosition().pb);
  map.setCenter(location);
  google.maps.event.addListener(marker, 'dragend', (function(marker) {
    return function() {
      setForm(marker.getPosition().ob, marker.getPosition().pb);
    };
  })(marker));
  $('#hazard_button').on('click', function(event) {
    $('#popup').delay(500).fadeOut();
    $('#add-marker').next('p').remove();
  });
  $('#accident_button').on('click', function(event) {
    $('#popup').delay(500).fadeOut();
    $('#add-marker').next('p').remove();
  });
}
//delete marker function
var clearMarker = function(marker) {
  marker.setMap(null);
};
//??
var setForm = function(lat, lng) {
  $('#hazard_latitude').val(lat);
  $('#hazard_longitude').val(lng);
  $('#accident_latitude').val(lat);
  $('#accident_longitude').val(lng);
};
//??
var clearForm = function() {
  $('#hazard_latitude').val('');
  $('#hazard_longitude').val('');
  $('#hazard_description').val('');
  $('#accident_latitude').val('');
  $('#accident_longitude').val('');
  $('#accident_details').val('');
};

//voting feature
$(document).ready(function() {
  getHazardData();
//ajax call onclick upvote
  $('div').on("click", ".upvote", function(event){
  var $hazardId = $(this).attr("data-id");
  var $voteUrl = '/hazards/'+ $hazardId +'/votes';
  console.log($voteUrl);
    $.ajax({
    url: $voteUrl,
    type: 'post',
    data: {
      "vote": true
    }
  }).done(function(response){
    getHazardData();
  });

});
//ajaz call downvote onclick
  $('div').on("click", ".downvote", function(event) {
    var $hazardId = $(this).attr("data-id");
    var $voteUrl = '/hazards/'+ $hazardId +'/votes';
      $.ajax({
      url: $voteUrl,
      type: 'post',
      data: {
        "vote": false
      }
    }).done(function(response){

      getHazardData();

      //console.log(response);

    });
  });
//ajax call for sidebar onclick directs user to click map to add marker
  $('#add-marker').on("click", function(event) {
    $('#add-marker').next('p').empty();
    $('#add-marker').next('p').append('Click on map to place marker');
    clearForm();
    
    //adds a marker to the map when user clicks
    google.maps.event.addListener(map,'click',function(e){
      $('#popup').delay(500).fadeIn('fast');
      userMarker(e.latLng);
    });
  });
//ajax call when user is done adding markers they state done
  $('#done-marker').on("click", function(event) {

    //console.log("working");

    google.maps.event.clearListeners(map, 'click');
  });

});
//draggable marker option
var rendererOptions = {
  draggable: true
};