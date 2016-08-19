/**
 * Created by Jackie on 2016-08-17.
 */
var map;
var markerLoc;
var geocoder;

function initMap(lat, lng, allowClick) {
  var location = {lat: lat, lng: lng};

  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('popup_googleMap'), {
    center: location,
    zoom: 15
  });

  if (allowClick != undefined && allowClick) {
    map.addListener('click', function (e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      location = {lat: lat, lng: lng};
      geocodeLatLng(location, setLocationAddress);
      deleteMarkers();
      setLocationInput(location);
      addMarker(e.latLng);
    });
  }
}
function codeAddress(address) {
  geocoder.geocode({'address': address}, function (results, status) {
    if (status == 'OK') {
      return results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodeLatLng(latLng, callback) {
  var address = "";
  geocoder.geocode({'location': latLng}, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        address = results[0].formatted_address;
        if (callback != undefined) {
          callback(address);
        }
      } else {
        window.alert('No results found');
      }
      return address;
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });

}

function addMarker(location) {
  marker = new google.maps.Marker({
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