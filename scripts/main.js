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
				<div id="map">
					<MeetupMap/>
				</div>
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
	'this' inside StorePicker refers to the component, not the function
*/

var MeetupInputForm = React.createClass({
	// History is part of ReactRouter, see line ~ 8
	mixins : [History],

	// goToStore : function(event) {
	// 	event.preventDefault();
	// 	var storeId = this.refs.storeId.value;
	// 	this.history.pushState(null, '/store/' + storeId);
	// },

	render : function() {
		return (
			<form className="meetup-input-form" onSubmit={this.goToStore}> 
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
// {map.new(39.9526, -75.1652, 11)}

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









