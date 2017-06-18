var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var UserDashboard = require('UserDashboard');
var RegistrationForm=require('RegistrationForm');
var LogIn=require('LogIn');
var userDetails = require('userDetails');
var updateProfile = require('updateProfile');
// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="registration_form" component={RegistrationForm}/>


  </Route>
    <Route path="login" component={LogIn}/>
  <Route path="UserDashboard" component={UserDashboard} />

  <Route path="userDetails" component={userDetails}/>
    <Route path="updateProfile" component={updateProfile}/>


  </Router>,
  document.getElementById('app')
);
