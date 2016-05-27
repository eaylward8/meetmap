var myGoogleMapsObj = {
	setParent : function() {
		this.gmap.parent = this;
		this.marker.parent = this;
		this.geocoder.parent = this;
	}
}

myGoogleMapsObj.gmap = {
	currentMap : null,

	loadMapAfterDOM : function() {
		document.addEventListener("DOMContentLoaded", function() {
			myGoogleMapsObj.gmap.currentMap = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39.9526, lng: -75.1652},
				zoom: 11
			});
		});
	}
}

myGoogleMapsObj.marker = {
	userMarker : '../build/css/images/green-pin.svg',

	markers : [],

	initialize : function(map, location, icon) {
		var marker = new google.maps.Marker({
			map: map,
			position: location,
			icon: icon
		});
		this.markers.push(marker);
	},

	//this is doing more than placing a marker - break up/rename
	placeMarker : function(map, location) {
		map.setCenter(location);
		map.setZoom(12);
		this.hidePriorMarkers();
		this.markers.length = 0;
		this.initialize(map, location, this.userMarker);
	},

	hidePriorMarkers : function() {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
	}
}

myGoogleMapsObj.geocoder = {
	location : null,

	geocodeAddress : function(address) {
		var gc = new google.maps.Geocoder();
		gc.geocode({'address': address}, this.handleGeocodeResults.bind(this));
	},

	handleGeocodeResults : function(results, status) {
		var p = this.parent;
		if (status === google.maps.GeocoderStatus.OK) {
			this.location = results[0].geometry.location;
			// place marker for user's address
			p.marker.placeMarker(p.gmap.currentMap, this.location);
			// move ajax call elsewhere
			$.get({
				url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&time=%2C1d&desc=False&status=upcoming&sig_id=190348600&sig=8edc07f145dfbe02e2b74b07f204eb058f667ac6',
				data: {lat: this.location.lat(), lon: this.location.lng(), radius: 1.0},
				dataType: "jsonp"
			}).success(function(data) {
				//iterate over meetups
				// use map iterator
				var validMeetups = data.results.filter(function(meetup) {
					if (meetup.venue) { return meetup }
				});
				validMeetups.forEach(function(meetup) {
					var lat = meetup.venue.lat;
					var lon = meetup.venue.lon;
					var myLatLon = new google.maps.LatLng(lat, lon);
					p.marker.initialize(p.gmap.currentMap, myLatLon);
				});
				// make markers for each meetup
			}); // end ajax
		} else {
			alert("Please enter a valid address. (Error: " + status + ")");
		}
	},

}

export default myGoogleMapsObj;






















