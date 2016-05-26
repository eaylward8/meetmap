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

var h = require('./helpers');
var map = require('./google-map');
var geo = require('./google-geocoder');
var marker = require('./google-marker');

/* 
	App
*/

var App = React.createClass({
	render : function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header/>
				</div>
				<div>
					<MeetupInputForm/>
				</div>
				<MeetupMap/>
			</div>
		)
	}
});

/* 
	Header
*/

var Header = React.createClass({
	render : function() {
		return (
			<header className="top">
				<h1>Find Meetups Near You</h1>
			</header>
		)
	}
});

/* 
	Order
*/

var Order = React.createClass({
	render : function() {
		return (
			<p>Order</p>
		)
	}
});

/* 
	MeetupInputForm
	<MeetupInputForm/>
	'this' refers to the component, not the function
*/

var MeetupInputForm = React.createClass({
	// History is part of ReactRouter, see line ~ 8
	mixins : [History],

	setLocation : function(event) {
		event.preventDefault();
		var address = this.refs.address.value;
		var geocoder = geo.initialize();
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				geo.location = results[0].geometry.location;
				marker.placeMarker(map.currentMap, geo.location);
			} else {
				alert("Geocode process had the following error:" + status)
			}
		});
		// this.history.pushState(null, '/');
	},

	render : function() {
		return (
			<form className="meetup-input-form" onSubmit={this.setLocation}>
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

var MeetupMap = React.createClass({
	render : function() {
		return (
			<div id="map">
				{map.loadMapAfterDOM()}
			</div>
		)
	}
});

/*
	Not Found
*/

var NotFound = React.createClass({
	render : function() {
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









