import React from 'react';

/*
	InfoModal
	<InfoModal/>
*/

var InfoModal = React.createClass({
	render: function() {
		return (
			<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">How To Use MeetMap</h4>
			      </div>
			      <div className="modal-body">
			        <p>Enter an address, city, or place name.</p>
			        <p>Provide a search radius.</p>
			        <p>MeetMap displays Meetups happening in your area over the next 3 days.</p>
			        <p>Up to 30 Meetups will be returned, with those scheduled earlier appearing first.</p>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
});

export default InfoModal;