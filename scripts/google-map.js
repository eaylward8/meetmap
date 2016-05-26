var googleMap = {
	currentMap : null,

	loadMapAfterDOM : function() {
		document.addEventListener("DOMContentLoaded", googleMap.initialize);
	},

	initialize : function() {
		googleMap.currentMap = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.9526, lng: -75.1652},
			zoom: 11
		});
	}
}

export default googleMap;