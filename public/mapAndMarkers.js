var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.5072, lng: 0.1275},
    zoom: 9
  });
}
var score = 0;
function createMarkerWithInfo(obj) {
	var latLng = {lat: +obj.lat, lng: +obj.lng};

	var contentString = '<div id="content">'+
  '<div id="bodyContent">'+
  '<p>Name: '+ obj.name + '</p>' +
  '<p>Address: '+ obj.address + '</p>' +
  '<p>Phone Number: '+ obj.phone + '</p>' +
  '</div>'+
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: obj.name
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  score++; 
  if(score%5 === 0) {
    map.panTo(latLng);
    map.setZoom(10);
  }
}

document.getElementById('submitPostcode').addEventListener('click', function(x) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
    	var markerArray = JSON.parse(xhr.responseText);
    	markerArray.forEach(function(x) {
	    	createMarkerWithInfo(x);
	    });
		}
	};
	var postCode = document.getElementById('postCodeInput').value;
	var page = document.getElementById('GP') ? 'GP' : 'SG';
	xhr.open('GET', page+'&postCode='+postCode);
	xhr.send();
});