var meetupApiAdapter = {
	urls: {
		baseEventsUrl: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=30&time=%2C3d&desc=False&status=upcoming&sig_id=190348600&sig=16c0b7bd50a85947c5ce79953fe8aff48cf24b4b'
	},
	
	returnMeetupData: function(lat, lon, rad) {
		var p = new Promise(function(resolve, reject) {
			$.get({
				url: meetupApiAdapter.urls.baseEventsUrl,
				data: {lat: lat, lon: lon, radius: rad},
				dataType: 'jsonp'
			}).success(function(data) {
				var validMeetups = data.results.filter(function(meetup) {
					if (meetup.venue) { return meetup }
				});

				if (validMeetups.length){
					resolve(validMeetups);	
				} else {
					reject('Sorry, no meetups were found!');
				}
			});
		});
		return p;
	}
}

export default meetupApiAdapter;