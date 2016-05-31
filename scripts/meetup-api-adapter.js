var meetupApiAdapter = {
	urls: {
		baseEventsUrl: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&desc=False&status=upcoming&sig_id=190348600&sig=b5300643d74e1cf8aca59cedf9a136814fa50dd6'
	},
	
	returnMeetupData: function(lat, lon, category) {
		debugger;
		var p = new Promise(function(resolve, reject) {
			$.get({
				url: meetupApiAdapter.urls.baseEventsUrl,
				data: {lat: lat, lon: lon, category: category, radius: 5.0},
				dataType: 'jsonp'
			}).success(function(data) {
				debugger;
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