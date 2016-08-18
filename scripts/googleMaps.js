/**
 * Created by Jackie on 2016-08-17.
 */
var map;
var markerLoc;

function initMap(lat, lng) {
  var location = {lat: lat, lng: lng};

  map = new google.maps.Map(document.getElementById('popup_googleMap'), {
    center: location,
    zoom: 15
  });

  map.addListener('click', function (e) {
    deleteMarkers();
    setLocationInput({ lat: e.latLng.lat , lng: e.latLng.lng });
    addMarker(e.latLng);
  });
}

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markerLoc = marker;
}

function deleteMarkers() {
  if (markerLoc != null) {
    markerLoc.setMap(null);
  }
}