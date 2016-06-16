import React from 'react';

/* 
	MeetupInputForm
	<MeetupInputForm/>
*/

var MeetupInputForm = React.createClass({
	getInitialState: function() {
		return {
		  address: "",
			radius: 2.5
		}
	},

	displayPinsAndMeetups: function(event) {
		event.preventDefault();
		// move into App
		var gc = new google.maps.Geocoder();
		var address = this.state.address;
		gc.geocode({'address': address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var myMap = this.props.state.gmaps['gmap'];
				var myLoc = results[0].geometry.location;
				var radius = this.state.radius;
				this.props.addLocation(myLoc);
				this.props.setMapToUserLocation(myMap, myLoc, radius);
				this.props.findMeetups(radius);
			} else {
				alert("Please enter a valid address. (Error: " + status + ")");
			}
		}.bind(this));
	},

	handleInputChange: function(key, event) {
		this.setState({
			[key]: event.target.value
		});
	},

	render: function() {
		return (
				<form className="meetup-input-form form-inline" ref="meetupInput" onSubmit={this.displayPinsAndMeetups}>
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input className="form-control" type="text" id="address" placeholder="1401 John F Kennedy Blvd, Philadelphia, PA"required onChange={this.handleInputChange.bind(this, 'address')} />
			
						<label htmlFor="radius">Radius (miles) </label>
						<select className="form-control" onChange={this.handleInputChange.bind(this, 'radius')}>
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