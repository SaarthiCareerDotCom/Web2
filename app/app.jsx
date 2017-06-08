var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

var LogIn=require('LogIn')
// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={LogIn}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
