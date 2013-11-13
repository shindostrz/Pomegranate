  var marker;
  function initialize() {

    var LocationData = [
      [37.769807, -122.4113, "Bicyclist struck, killed by Muni bus in SOMA"],
      [37.7749295, -122.4194155, "Bicyclist sentenced for manslaughter in SF crash"],
      [37.778524, -122.405634, "Bicyclist died in SoMa crash with truck"],
      [37.765183, -122.41751, "Bicyclist fatally struck by vehicle in Inner Mission"],
      [37.778006, -122.391707, "Women cyclist killed in collision near ballpark"],
      [37.786543, -122.414801, "Bicyclist injured in collision with Muni Bus "],
      [37.7749295, -122.4194155, "Warrant for cyclist accused of killing pedestrian"],
      [37.775257, -122.420935, "Bicyclist badly hurt in S.F. crash"],
  ];

UserData = ["test"]

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
    for (i=0; i< LocationData.length; i++){
      deaths = new google.maps.Marker({
        // icon: '',
        position: new google.maps.LatLng(LocationData[i][0], LocationData[i][1]),
        animation: google.maps.Animation.DROP,map:map
      });
       google.maps.event.addListener(deaths, 'mouseover', (function(deaths, i) {
          return function() {
            infowindow.setContent(LocationData[i][2]);
            infowindow.open(map, deaths);

          };
        })(deaths, i));
      }

      //push information about latlng to userdata array
      google.maps.event.addListener(map,'rightclick',function(e){
       placeMarker(e.latLng);
       UserData.push([e.latLng.ob,e.latLng.pb]);
       infowindows.setContent(UserData[0]);
       infowindows.open(map, marker);
       console.log(marker);
    });

  };

  function placeMarker(location) {
    if (marker === undefined){
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.ob, location.pb),
            map: map,
            animation: google.maps.Animation.DROP,
        })
         google.maps.event.addListener(marker, 'mouseover', (function(marker) {
          return function() {
            infowindows.setContent(UserData[0]);
            infowindows.open(map, marker);
          };
        })(marker))
    }
    else{
        marker.setPosition(location);
    }
    map.setCenter(location);
    alert(marker.position);
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
  })
});