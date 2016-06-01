import React from 'react';

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
				  		<button id="info-button" data-toggle="modal" data-target="#myModal">
				  			<span className="glyphicon glyphicon-info-sign"></span>
				  		</button>
				    </div>
				  </div>
				</nav>
			</div>
		)
	}
});

export default Header;