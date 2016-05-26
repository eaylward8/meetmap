var meetupApiAdapter = {
	url : "https://api.meetup.com/2/open_events?&sign=true&photo-host=public&zip=19102&time=,1d&page=20&key=3749642367a6f263c2715525495d26",
	
	makeRequest : function() {
		$.get({
			url: "https://api.meetup.com/2/open_events?&sign=true&photo-host=public&zip=19102&time=,1d&page=20&key=3749642367a6f263c2715525495d26"
		}).success(function(data) {
			debugger;
		})
	}
}

export default meetupApiAdapter;