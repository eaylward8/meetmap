var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
/* 
	- createBrowserHistory allows for better URLs
	- called in routes variable, inside <Router>
*/
var createBrowserHistory = require('history/lib/createBrowserHistory');

/* 
	IMPORT COMPONENTS
*/
import App from './components/App';
import NotFound from './components/NotFound';

/* 
	Routes
	(Written as JSX)
*/

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));









