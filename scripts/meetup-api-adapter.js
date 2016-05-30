var meetupApiAdapter = {
	baseUrl: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&time=%2C1d&desc=False&status=upcoming&sig_id=190348600&sig=8edc07f145dfbe02e2b74b07f204eb058f667ac6',

	returnMeetupData: function(lat, lon) {
		var p = new Promise(function(resolve, reject) {
			$.get({
				url: meetupApiAdapter.baseUrl,
				data: {lat: lat, lon: lon, radius: 5.0},
				dataType: "jsonp"
			}).success(function(data) {
				var validMeetups = data.results.filter(function(meetup) {
					if (meetup.venue) { return meetup }
				});

				if (validMeetups.length){
					resolve(validMeetups);	
				} else {
					debugger;
					reject("Sorry, no meetups were found!");
				}
				

				// validMeetups.forEach(function(meetup) {
				// 	var lat = meetup.venue.lat;
				// 	var lon = meetup.venue.lon;
				// 	var myLatLon = new google.maps.LatLng(lat, lon);
				// 	debugger;
				// 	this.initMarker(myMap, myLatLon);
				// });
			}); // end ajax
		});

		return p;
		
	}
}

export default meetupApiAdapter;