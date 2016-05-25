let googleMap = {
	test : function() {
		return "Please work";
	},

	currentMap: null,

	initMap : function() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.9526, lng: -75.1652},
			zoom: 11
		});
	}
}

export default googleMap;