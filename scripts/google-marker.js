var googleMarker = {
	userMarker : '../images/blue-pin.svg',

	markers : [],

	initialize : function(map, location, icon) {
		var marker = new google.maps.Marker({
			map: map,
			position: location,
			icon: icon
		});
		googleMarker.markers.push(marker);
	},



	//this is doing more than placing a marker - break up/rename
	placeMarker : function(map, location) {
		map.setCenter(location);
		map.setZoom(12);
		googleMarker.hidePriorMarkers();
		googleMarker.initialize(map, location, googleMarker.userMarker);
	},

	hidePriorMarkers : function() {
		for (var i = 0; i < googleMarker.markers.length; i++) {
			googleMarker.markers[i].setMap(null);
		}
	}
}

export default googleMarker;