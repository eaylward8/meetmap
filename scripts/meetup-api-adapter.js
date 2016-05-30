var meetupApiAdapter = {
	urls: {
		baseEventsUrl: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&time=%2C1d&desc=False&status=upcoming&sig_id=190348600&sig=8edc07f145dfbe02e2b74b07f204eb058f667ac6',

		categoryUrl: 'https://api.meetup.com/2/categories?offset=0&format=json&photo-host=public&page=100&order=shortname&desc=false&sig_id=190348600&sig=9f46690bb1d786258c1fadb0cf728c55f8c29b3c'
	},
	
	returnMeetupData: function(lat, lon) {
		var p = new Promise(function(resolve, reject) {
			$.get({
				url: meetupApiAdapter.urls.baseEventsUrl,
				data: {lat: lat, lon: lon, radius: 5.0},
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