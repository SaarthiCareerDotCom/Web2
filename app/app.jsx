var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
import ForgotPassword from './components/ForgotPassword.jsx';
import LoginForm from 'LoginForm';
import RegistrationForm from 'RegistrationForm';
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={LoginForm}/>
      <Route path="registration" component={RegistrationForm}/>
    </Route>
    <Route path="forgotpassword" component={ForgotPassword}/>
  </Router>,
  document.getElementById('app')
);
