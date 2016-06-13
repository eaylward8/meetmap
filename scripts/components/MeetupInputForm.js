import React from 'react';

/* 
	MeetupInputForm
	<MeetupInputForm/>
*/

var MeetupInputForm = React.createClass({
	displayPinsAndMeetups: function(event) {
		event.preventDefault();

		var prom = new Promise(function(resolve, reject) {
			resolve(new google.maps.Geocoder());
		}.bind(this));

		prom.then(function(value) {
			var address = this.refs.address.value;
			var gc = value;
			gc.geocode({'address': address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var myMap = this.props.state.gmaps['gmap'];
					var myLoc = results[0].geometry.location;
					var radius = this.refs.radius.value;
					this.props.addLocation(myLoc);
					this.props.setMapToUserLocation(myMap, myLoc, radius);
					this.props.findMeetups(radius);
				} else {
					alert("Please enter a valid address. (Error: " + status + ")");
				}
				this.refs.meetupInput.reset();	
			}.bind(this));
		}.bind(this));
	},

	render: function() {
		return (
				<form className="meetup-input-form form-inline" ref="meetupInput" onSubmit={this.displayPinsAndMeetups}>
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input className="form-control" type="text" id="address" ref="address" placeholder="1401 John F Kennedy Blvd, Philadelphia, PA"required/>
			
						<label htmlFor="radius">Radius (miles) </label>
						<select className="form-control" ref="radius">
							<option value={2.5}>2.5</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
						</select>
						<input type="Submit" className="btn btn-primary" defaultValue="Find Meetups!"/>
					</div>
				</form>
		)
	}
});

export default MeetupInputForm;