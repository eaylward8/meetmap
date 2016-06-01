import React from 'react';

/*
	GoogleMap
	<GoogleMap/>
*/

var GoogleMap = React.createClass({
	loadMapAfterDOM: function(gmaps) {
		document.addEventListener("DOMContentLoaded", function() {
			gmaps['gmap'] = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39.9526, lng: -75.5},
				zoom: 8
			});
			gmaps['infowindow'] = new google.maps.InfoWindow();
		});
	},

	render: function() {
		return (
			<div id="map">
				{this.loadMapAfterDOM(this.props.gmaps)}
			</div>
		)
	}
});

export default GoogleMap;