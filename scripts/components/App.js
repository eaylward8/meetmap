var React = require('react');
import InfoModal from './InfoModal';
import Header from './Header';
import MeetupInputForm from './MeetupInputForm';
import GoogleMap from './GoogleMap';
import MeetupDetail from './MeetupDetail';

var meetupApiAdapter = require('../meetup-api-adapter');
var locationCount = 0;
var meetupCount = 0;

/* 
	App
*/

var App = React.createClass({
	getInitialState: function() {
		return {
			gmaps: {},
			markers: {},
			locations: {},
			meetups: {}
		}
	},

  clearMeetups: function() {
  	this.state.meetups = {};
  },

	findMeetups: function(radius) {
		var id = locationCount;
		var rad = parseFloat(radius);
		var lat = this.state.locations['loc-' + id].lat();
		var lng = this.state.locations['loc-' + id].lng();
		var promise = meetupApiAdapter.returnMeetupData(lat, lng, rad);

		var callback = {
			fulfillment: this.placeMeetupMarkers,
			rejection: function(reason) { alert(reason) }
		}

		promise.then(callback.fulfillment, callback.rejection);
	},

	placeMeetupMarkers: function(meetups) {
		meetupCount = 0;
		this.clearMeetups();
		meetups.forEach(function(meetup) {
			var lat = meetup.venue.lat;
			var lon = meetup.venue.lon;
			var myLatLon = new google.maps.LatLng(lat, lon);
			var eventName = meetup.name;
			var group = meetup.group.name;
			var address = meetup.venue.address_1 + ", " + meetup.venue.city;
			var url = meetup.event_url;
			var content = '<h4>' + group + '</h4>' +
				'<p><a target="_blank" href=' + url + '>' + eventName + '</a></p>' +
				'<p>' + address + '</p>';
			this.addMeetup(meetup, content);
			this.initMarker(this.state.gmaps.gmap, myLatLon, null, content);
		}, this);
	},

	addMeetup: function(meetup, content) {
		var meetupId = meetupCount += 1;
		this.state.meetups['meetup-' + meetupId] = meetup;
		this.state.meetups['meetup-' + meetupId]['content'] = content;
		this.setState({ meetups: this.state.meetups })
	},

	addLocation: function(location) {
		var id = locationCount += 1;
		this.state.locations['loc-' + id] = location;
		// set up array for this location's markers
		this.setState({ locations: this.state.locations });
	},

	setMapToUserLocation: function(map, location, radius) {
		// var icon = {
		// 	url: '../../css/images/green-pin.svg',
		// 	scaledSize: new google.maps.Size(70,70)
		// };
		// 16-Jun-16: Custom marker not displaying correctly - getting obscured by other markers
		// changed from custom marker to regular marker w/ star label

		var radii = {'2.5': 13, '5': 12, '10': 11, '25': 9, '50': 8};
		var label = '\u2605';
		map.setCenter(location);
		map.setZoom(radii[radius]);
		
		if (locationCount > 1) {
			this.hidePriorMarkers();	
		}
		var content = '<p>You are here!</p>';
		this.initMarker(map, location, label, content);
	},

	initMarker: function(map, location, label, content) {	
		// icon commented out below because custom icon is breaking; see above comments
		var marker = new google.maps.Marker({
			map: map,
			position: location,
			// icon: icon
			label: label
		});

		google.maps.event.addListener(marker, 'click', function() {
    	this.state.gmaps.infowindow.setContent(content);	
    	this.state.gmaps.infowindow.open(map, marker);
  	}.bind(this));

		this.addMarker(marker);
	},

	addMarker: function(marker) {
		var meetupId = meetupCount;
		this.state.markers['meetup-' + meetupId + '-marker'] = marker;
		this.setState({ markers: this.state.markers });
	},

	hidePriorMarkers: function() {
		for (var key in this.state.markers) {
			this.state.markers[key].setMap(null);
		};
	},

	renderMeetupDetail: function(key) {
		return <MeetupDetail key={key} index={key} meetupInfo={this.state.meetups[key]} markers={this.state.markers} gmaps={this.state.gmaps}/>
	},

	render: function() {
		return (
			<div className="container-fluid">
				<InfoModal/>
				<Header/>
				<div className="row" id="main-container">
					<div className="col-md-7">
						<MeetupInputForm state={this.state} addLocation={this.addLocation} setMapToUserLocation={this.setMapToUserLocation} findMeetups={this.findMeetups}/>
						<GoogleMap gmaps={this.state.gmaps}/>
					</div>
					<div className="col-md-5" id="meetup-list-div">
							{Object.keys(this.state.meetups).map(this.renderMeetupDetail)}
					</div>
				</div>
			</div>
		)
	}
});

export default App;