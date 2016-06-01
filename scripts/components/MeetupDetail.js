import React from 'react';

/* 
	MeetupDetail
	<MeetupDetail/>
*/

var MeetupDetail = React.createClass({
	openInfowindow: function() {
		var key = this.props.index;
		var infowindow = this.props.gmaps.infowindow;
		var map = this.props.gmaps.gmap;
		var marker = this.props.markers[key + '-marker'];
		var content = this.props.meetupInfo.content;
		infowindow.setContent(content);
		infowindow.open(map, marker);
	},

	formatDate: function(milliseconds) {
		var dateObj = new Date(milliseconds);
		var dateStr = dateObj.toDateString();
		var amPm = "am"
		var hour = function() {
			if (dateObj.getHours() >= 12) { amPm = "pm" }
			if (dateObj.getHours() > 12) { 
				return dateObj.getHours() - 12 
			}
			return dateObj.getHours();
		}();
		var min = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
		return dateStr += ", " + hour + ":" + min + " " + amPm;
	},

	render: function() {
		var group = this.props.meetupInfo.group.name;
		var time = this.formatDate(this.props.meetupInfo.time);
		var address = this.props.meetupInfo.venue.address_1 + ", " + this.props.meetupInfo.venue.city;
		var eventName = this.props.meetupInfo.name;
		var numPeople = this.props.meetupInfo.yes_rsvp_count;
		var url = this.props.meetupInfo.event_url;
		return (
			<div className="panel panel-primary">
				<div className="panel-heading" onClick={this.openInfowindow}>
					<h4>{group}</h4>
				</div>
				<div className="panel-body">
					<p><a href={url} target="_blank"><strong>{eventName}</strong></a></p>
					<p><strong>{time}</strong></p>
					<p>{address}</p>
					<p>{numPeople} people going</p>
				</div>
			</div>
		)
	}
});

export default MeetupDetail;