var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
// allows for better URLs
// called in routes variable, inside <Router>
var createBrowserHistory = require('history/lib/createBrowserHistory');

var meetupApiAdapter = require('./meetup-api-adapter');

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

	geocodeAddress: function(address) {
		var gc = new google.maps.Geocoder();
		gc.geocode({'address': address}, this.handleGeocodeResults);
	},

	handleGeocodeResults: function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var myMap = this.state.gmaps['gmap'];
			var myLoc = results[0].geometry.location;
			this.addLocation(myLoc);
			this.setMapToUserLocation(myMap, myLoc);

			var promise = meetupApiAdapter.returnMeetupData(myLoc.lat(), myLoc.lng());
			
			var callback = {
				fulfillment: this.placeMeetupMarkers,
				rejection: function(reason) { alert(reason) }
			}

			promise.then(callback.fulfillment, callback.rejection);

		} else {
			alert("Please enter a valid address. (Error: " + status + ")");
		}
	},

	placeMeetupMarkers: function(meetups) {
		meetups.forEach(function(meetup) {
			var lat = meetup.venue.lat;
			var lon = meetup.venue.lon;
			var myLatLon = new google.maps.LatLng(lat, lon);
			this.initMarker(this.state.gmaps.gmap, myLatLon);
		}, this);
	},

	addLocation: function(location) {
		var id = locationCount += 1;
		this.state.locations['loc-' + id] = location;
		// set up array for this location's markers
		this.state.markers['loc-' + id + '-markers'] = [];
		this.setState({ locations: this.state.locations, markers: this.state.markers });
	},

	setMapToUserLocation: function(map, location) {
		var userMarker = '../build/css/images/green-pin.svg';
		map.setCenter(location);
		map.setZoom(11);
		
		if (locationCount > 1) {
			this.hidePriorMarkers();	
		}

		this.initMarker(map, location, userMarker);
	},

	initMarker: function(map, location, icon) {
		var marker = new google.maps.Marker({
			map: map,
			position: location,
			icon: icon
		});
		this.addMarker(marker);
	},

	addMarker: function(marker) {
		this.state.markers['loc-' + locationCount + '-markers'].push(marker);
		this.setState({ markers: this.state.markers });
	},

	hidePriorMarkers : function() {
		var prevId = locationCount - 1;
		this.state.markers['loc-' + prevId + '-markers'].forEach(function(marker) {
			marker.setMap(null);
		});
	},

	render: function() {
		return (
			<div className="top-div">
				<Header/>
				<div>
					<MeetupInputForm geocodeAddress={this.geocodeAddress}/>
				</div>
				<GoogleMap gmaps={this.state.gmaps}/>
			</div>
		)
	}
});

/* 
	Header
*/

var Header = React.createClass({
	render: function() {
		return (
			<header className="top">
				<h1>Find Meetups Near You</h1>
			</header>
		)
	}
});

/* 
	MeetupInputForm
	<MeetupInputForm/>
*/

var MeetupInputForm = React.createClass({
	// History is part of ReactRouter, see line ~ 8
	// mixins : [History],

	getAddress: function(event) {
		event.preventDefault();
		var address = this.refs.address.value;
		// take address and add to App State
		this.props.geocodeAddress(address);
		this.refs.meetupInput.reset();
	},

	render: function() {
		return (
			<form className="meetup-input-form" ref="meetupInput" onSubmit={this.getAddress}>
				<label htmlFor="address">Address </label> 
				<input type="text" id="address" ref="address" required/><br/>
				<input type="Submit"/>
			</form>
		)
	}
});

/*
	MeetupMap
	<MeetupMap/>
*/

var GoogleMap = React.createClass({
	loadMapAfterDOM: function(gmaps) {
		document.addEventListener("DOMContentLoaded", function() {
			gmaps['gmap'] = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39.9526, lng: -75.1652},
				zoom: 11
			});
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

/*
	Not Found
*/

var NotFound = React.createClass({
	render: function() {
		return <h1>Not Found!</h1>
	}
});

/* 
	Routes
	Written as JSX
*/

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));









