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

	componentDidMount: function() {
    // var localStorageRef = localStorage.getItem('meetups');
    // if (localStorageRef) {
    //   this.setState({
    //     meetups: JSON.parse(localStorageRef)
    //   })
    // }
  },

  componentWillUpdate: function(nextProps, nextState) {
    // localStorage.setItem('meetups', JSON.stringify(nextState.meetups));
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
			var content = '<h4>' + group + '</h4>' +
				'<p>' + eventName + '</p>';
			this.addMeetup(meetup);
			this.initMarker(this.state.gmaps.gmap, myLatLon, null, content);
		}, this);
	},

	addMeetup: function(meetup) {
		var locId = locationCount;
		var meetupId = meetupCount += 1;
		this.state.meetups['loc-' + locationCount + '-meetup-' + meetupId] = meetup;
		this.setState({ meetups: this.state.meetups })
	},

	addLocation: function(location) {
		var id = locationCount += 1;
		this.state.locations['loc-' + id] = location;
		// set up array for this location's markers
		this.state.markers['loc-' + id + '-markers'] = [];
		this.setState({ locations: this.state.locations, markers: this.state.markers, meetups: this.state.meetups });
	},

	setMapToUserLocation: function(map, location, radius) {
		var userMarker = '../build/css/images/green-pin.svg';
		var radii = {'2.5': 13, '5': 12, '10': 11, '25': 9, '50': 8}
		map.setCenter(location);
		map.setZoom(radii[radius]);
		
		if (locationCount > 1) {
			this.hidePriorMarkers();	
		}
		var content = '<p>You are here!</p>';
		this.initMarker(map, location, userMarker, content);
	},

	initMarker: function(map, location, icon, content) {	
		var marker = new google.maps.Marker({
			map: map,
			position: location,
			icon: icon
		});

		google.maps.event.addListener(marker, 'click', function() {
    	this.state.gmaps.infowindow.setContent(content);	
    	this.state.gmaps.infowindow.open(map, marker);
  	}.bind(this));

		this.addMarker(marker);
	},

	addMarker: function(marker) {
		this.state.markers['loc-' + locationCount + '-markers'].push(marker);
		this.setState({ markers: this.state.markers });
	},

	hidePriorMarkers: function() {
		var prevId = locationCount - 1;
		this.state.markers['loc-' + prevId + '-markers'].forEach(function(marker) {
			marker.setMap(null);
		});
	},

	renderMeetupDetail: function(key) {
		return <MeetupDetail key={key} index={key} meetupInfo={this.state.meetups[key]}/>
	},

	render: function() {
		return (
			<div className="container-fluid">
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

/* 
	Header
	<Header/>
*/

var Header = React.createClass({
	render: function() {
		return (
			<div className="row">
				<nav className="navbar navbar-default" id="nav-custom">
				  <div className="container-fluid">
				  	<div className="navbar-header">
				  		<img src="../css/images/green-pin.svg" alt="Green Map Pin" id="green-pin"/>
				  		<span id="meetmap-title">MeetMap</span>
				    </div>
				  </div>
				</nav>
			</div>
		)
	}
});

/* 
	MeetupDetail
	<MeetupDetail/>
*/

var MeetupDetail = React.createClass({
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
		var eventName = this.props.meetupInfo.name;
		var numPeople = this.props.meetupInfo.yes_rsvp_count;
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h4>{group}</h4>
				</div>
				<div className="panel-body">
					<p><strong>{time}</strong></p>
					<p>{eventName}</p>
					<p>{numPeople} people going</p>
				</div>
			</div>
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
				<form className="meetup-input-form form-inline" ref="meetupInput" onSubmit={this.getAddress}>
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
						<input type="Submit" className="btn btn-primary"/>
					</div>
				</form>
		)
	}
});

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









