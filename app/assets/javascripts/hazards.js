var infoWindowTemplate = _.template('<p data-id="<%= id %>"><strong><%= hazard_type %></strong><br><%= description %></p><small>Added: <%= created_at %></small><p><a href="/hazards/<%= id %>" data-method="delete" data-remote="true" rel="nofollow" onclick="initialize()">Delete</a></p>');

var marker;
function initialize() {

  //call to controller for hazard database info
  $.ajax({
    url: '/hazards.json',
    type: 'GET'
  }).done(function(data) {
    var hazardData = data;

    //sample data from accidents

    var locationData = [
      [37.769807, -122.4113, "Bicyclist struck, killed by Muni bus in SOMA"],
      [37.7749295, -122.4194155, "Bicyclist sentenced for manslaughter in SF crash"],
      [37.778524, -122.405634, "Bicyclist died in SoMa crash with truck"],
      [37.765183, -122.41751, "Bicyclist fatally struck by vehicle in Inner Mission"],
      [37.778006, -122.391707, "Women cyclist killed in collision near ballpark"],
      [37.786543, -122.414801, "Bicyclist injured in collision with Muni Bus "],
      [37.7749295, -122.4194155, "Warrant for cyclist accused of killing pedestrian"],
      [37.775257, -122.420935, "Bicyclist badly hurt in S.F. crash"],
    ];

//toogle button for bicycle routes legend

    var controlDiv = document.createElement('DIV');
      $(controlDiv).addClass('gmap-control-container')
                   .addClass('gmnoprint');

    var controlUI = document.createElement('DIV');
      $(controlUI).addClass('gmap-control');
      $(controlUI).text('Bicycle Routes');
      $(controlDiv).append(controlUI);

    var legend = '<ul>'
               + '<li><span class="trail">&nbsp;&nbsp;</span><span> Trails </span></li>'
               + '<li><span class="dedicated-lane">&nbsp;&nbsp;</span><span> Dedicated lanes </span></li>'
               + '<li><span class="friendly">&nbsp;&nbsp;</span><span> Bicycle friendly roads </span></li>'
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

//

    //default area within san francisco
    var sfLatlng = new google.maps.LatLng(37.7833, -122.4167);

    //zoomed in san francisco centering on the latlng above
    var mapOptions = {
      zoom: 14,
      center: sfLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //allow us to use maptions and uses id from index.html.erb
    map = new google.maps.Map(
        document.getElementById('map-canvas'),
        mapOptions);

    //bikelayer
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    //content info for hazards
    infowindow = new google.maps.InfoWindow();

    infowindows = new google.maps.InfoWindow();

    //marker dropped onto map
    var deaths, i;
    _.each(hazardData, function(hazard) {
      deaths = new google.maps.Marker({
        // icon: '',
        position: new google.maps.LatLng(hazard['latitude'], hazard['longitude']),
        animation: google.maps.Animation.DROP,map:map
      });
      google.maps.event.addListener(deaths, 'mouseover', (function(deaths, i) {
        return function() {
          infowindow.setContent(infoWindowTemplate(hazard));
          infowindow.open(map, deaths);
        };
      })(deaths, i));
    });

    //grabs lat and long from marker for form
    google.maps.event.addListener(map,'rightclick',function(e){
      userMarker(e.latLng);
      console.log(marker);
      $('#hazard_latitude').val(e.latLng.ob);
      $('#hazard_longitude').val(e.latLng.pb);
    });

///

var markersArray = [];
for (i = 0; i < hazardData.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(hazardData[i][0], hazardData[i][1]),
      map: map,
    });
   markersArray.push(marker);
}
var mcOptions = {gridSize: 50, maxZoom:15};
var mc = new MarkerClusterer(map,markersArray, mcOptions)

console.log(mc)
//
    //end of ajax done function

    //append toogle button to the top right of map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

  });
}

//user places new marker on map
function userMarker(location) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.ob, location.pb),
    map: map,
    animation: google.maps.Animation.DROP,
  });
  map.setCenter(location);
  $('#hazard_button').on('click', function(e) {
    event.preventDefault();
    google.maps.event.addListener(marker, 'mouseover', (function(marker) {
      return function() {
        infowindows.setContent($('#hazard_hazard_type').val());
        infowindows.open(map, marker);
      };
    })(marker));
  });
}

function clearMarker() {
  marker.setMap(null);
}

//Disclosure widget for form
$(document).ready(function() {
  $('#form_disclosure').on('click', function(event) {
    event.preventDefault();
    if ($('#marker_form').hasClass('hidden')) {
      $('#marker_form').removeClass('hidden');
    } else {
      $('#marker_form').addClass('hidden');
    }
  });
});