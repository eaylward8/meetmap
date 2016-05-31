var meetupApiAdapter = {
	urls: {
		baseEventsUrl: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&time=%2C1w&desc=False&status=upcoming&sig_id=190348600&sig=e1d28ac4c7fbb792f746289869e52e8f08c103b5'
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