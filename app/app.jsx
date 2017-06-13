var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var LoggedIn = require('LoggedIn');
var RegistrationForm=require('RegistrationForm');
var LogIn=require('LogIn')
// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="registration_form" component={RegistrationForm}/>
        <Route path="login" component={LogIn}/>
        <Route path="loggedIn" component={LoggedIn}/>

    </Route>

  </Router>,
  document.getElementById('app')
);
