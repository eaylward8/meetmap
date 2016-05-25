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

	getLocation : function(event) {
		event.preventDefault();
		var location = this.refs.location.value;
		console.log(location);
		// this.history.pushState(null, '/store/' + storeId);
	},

	render : function() {
		return (
			<form className="meetup-input-form" onSubmit={this.getLocation}> 
				<input type="text" ref="location" required/>
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
	loadMap : function() {
		document.addEventListener("DOMContentLoaded", function() {
    	map.initMap();
  	});
	},

	render : function() {
		return (
			<div id="map">
				{this.loadMap()}
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









