var googleMarker = {
	markers : [],

	initialize : function(map, location) {
		var marker = new google.maps.Marker({
			map: map,
			position: location
		});
		googleMarker.markers.push(marker);
	},

	//this is doing more than placing a marker - break up/rename
	placeMarker : function(map, location) {
		map.setCenter(location);
		map.setZoom(12);
		googleMarker.hidePriorMarkers();
		googleMarker.initialize(map, location);
	},

	hidePriorMarkers : function() {
		for (var i = 0; i < googleMarker.markers.length; i++) {
			googleMarker.markers[i].setMap(null);
		}
	}
}

export default googleMarker;