var infoWindowTemplate = _.template('<div class="infoWindow" data-id="<%= id %>"><p><strong>'
  + '<%= hazard_type %></strong><br><% if (description) { %><%= description %><br><% } %><small><% var added = new Date(created_at) %>'
  + '<% var dateString = added.toLocaleDateString(); %>'
  + '<%= dateString %></small></p><p><img src="/assets/upvote.png" alt="Up Vote" class="upvote" data-id="<%= id %>"><span class="voteCount" data=id="<%= id %>"><%= vote_count %></span>'
  + '<img src="/assets/downvote.png" alt="Down Vote" class="downvote" data-id="<%= id %>"></p>'
  + '<p class="delete"><% if (current_user) { if (current_user["id"] === user_id) { %><a href="/hazards/<%= id %>" data-method="delete" data-remote="true" rel="nofollow">'
  + 'Delete</a><% } } %></p></div>');

var infoWindowTemplateAccidents = _.template('<div class="infoWindow"><p><strong>Bicycle Accident</strong>'
  + '<% if (accident_date) { %><br><% var accidentDate = new Date(accident_date) %>'
  + '<% var dateString = accidentDate.toLocaleDateString(); %>'
  + '<%= dateString %><% } %><br><%= details %></p>'
  + '<% if (news_url) { %><a href="<%= news_url %>" target="_blank">News Link</a><% } %></div>');

ACCIDENT_DATA = [];
HAZARD_DATA = [];
VOTES = [];
var current_user;
var marker;
var map;
var directionsService, directionsDisplay;
var markersArray = [];

//call to controller for all database info needed
 var getHazardData = function() {
  $.ajax({
    url: '/hazards.json',
    type: 'GET'
  }).done(function(data) {
    HAZARD_DATA = data['hazards'];
    current_user = data['currentUser'];
    ACCIDENT_DATA = data['accidents'];
    getGeoLocation();
  });
 };

var getGeoLocation = function() {
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
      userLat = position.coords.latitude;
      userLong = position.coords.longitude;
      initialize();
  }

  function error() {
    userLat = 37.7833;
    userLong = -122.4167;
    initialize();
  }

  navigator.geolocation.getCurrentPosition(success, error);
};

var mapOptions = function(zoom, location) {
  var mapStuff = {
    zoom: zoom,
    center: location,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  return mapStuff;
};

// function to drop markers for hazards
var dropHazards = function() {
  var hazards, i;
  _.each(HAZARD_DATA, function(hazard) {
    hazards = new google.maps.Marker({
      icon: '/assets/hazard.png',
      position: new google.maps.LatLng(hazard['latitude'], hazard['longitude']),
      animation: google.maps.Animation.DROP,
      map: map
    });

    markersArray.push(hazards);

    google.maps.event.addListener(hazards, 'click', (function(hazards, i) {
      return function() {
        infowindow.setContent(infoWindowTemplate(hazard));
        infowindow.open(map, hazards);
      };
    })(hazards, i));
  });
};

// function to drop markers for accidents
var dropAccidents = function() {
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
};

function initialize() {
  markersArray = [];

  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsService = new google.maps.DirectionsService();

  //toggle button for bicycle routes legend
  var controlDiv = document.createElement('DIV');
    $(controlDiv).addClass('gmap-control-container')
                 .addClass('gmnoprint');

  var controlUI = document.createElement('DIV');
    $(controlUI).addClass('gmap-control');
    $(controlUI).text('Bicycle Routes');
    $(controlDiv).append(controlUI);

  var legend = '<ul>'
             + '<li><span id="trail">&nbsp;&nbsp;</span><span> Trails </span></li>'
             + '<li><span id="dedicated-lane">&nbsp;&nbsp;</span><span> Dedicated lanes </span></li>'
             + '<li><span id="friendly">&nbsp;&nbsp;</span><span> Bicycle friendly roads </span></li>'
             + '</ul>';

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

  var userLatlng = new google.maps.LatLng(userLat, userLong);

  //allow us to use maptions and uses id from index.html.erb
  map = new google.maps.Map(
      document.getElementById('map-canvas'),
      mapOptions(13, userLatlng));
  
  // Directions layer
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  // bikelayer
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  //content info for hazards
  infowindow = new google.maps.InfoWindow();
  newPinInfoWindow = new google.maps.InfoWindow();

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

  //append toogle button to the top right of map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

  dropHazards();
  dropAccidents();

  var mc = new MarkerClusterer(map,markersArray, mcOptions);
//end of initalize function
}

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

  setForm(location.ob, location.pb);

  map.setCenter(location);

  google.maps.event.addListener(marker, 'dragend', (function(marker) {
    return function() {
      setForm(marker.getPosition().ob, marker.getPosition().pb);
    };
  })(marker));

  $('#hazard_button').on('click', function(event) {
    $('#popup').delay(500).fadeOut();
    $('#add-marker').next('p').empty();
  });

  $('#accident_button').on('click', function(event) {
    $('#popup').delay(500).fadeOut();
    $('#add-marker').next('p').empty();
  });
}

var clearMarker = function(marker) {
  marker.setMap(null);
};

var setForm = function(lat, lng) {
  $('#hazard_latitude').val(lat);
  $('#hazard_longitude').val(lng);
  $('#accident_latitude').val(lat);
  $('#accident_longitude').val(lng);
};

var clearForm = function() {
  $('#hazard_latitude').val('');
  $('#hazard_longitude').val('');
  $('#hazard_description').val('');
  $('#accident_latitude').val('');
  $('#accident_longitude').val('');
  $('#accident_details').val('');
};

// Updates the database with the vote
var voteCall = function(hazardId, vote, callback){
  $.ajax({
    url: '/hazards/'+ hazardId +'/votes',
    type: 'post',
    data: {
      "vote": vote
    }
  }).done(function(response){
    callback(response);
  });
};

// This refreshes the vote count in the infoboxes after user votes
var updateVoteCount = function(data) {
  var $countDiv = $('.voteCount');
  setTimeout(function() {
    $.getJSON("/hazards.json", function(json) {
      hazard_data = json['hazards'];
      for (var i in hazard_data) {
        if (hazard_data[i]["id"] == data['hazard_id']) {
          var $newValue = hazard_data[i]["vote_count"];
          console.log(hazard_data[i]["vote_count"]);
          $countDiv.html($newValue);
        }
      }
    });
  }, 150);
};

var rendererOptions = {
  draggable: true
};

$(document).ready(function() {
  getHazardData();

  $('div').on("click", ".upvote", function(event){
    var $hazardId = $(this).attr("data-id");
    voteCall($hazardId, true, updateVoteCount);
  });

  $('div').on("click", ".downvote", function(event) {
    var $hazardId = $(this).attr("data-id");
    voteCall($hazardId, false, updateVoteCount);
  });

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

  $('#done-marker').on("click", function(event) {
    google.maps.event.clearListeners(map, 'click');
  });

});