var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
// <<<<<<< HEAD
// var LoggedIn = require('LoggedIn');
// var RegistrationForm=require('RegistrationForm');
// var LogIn=require('LogIn')
// =======

import ForgotPassword from './components/ForgotPassword.jsx';
import LoginForm from 'LoginForm';
import RegistrationForm from 'RegistrationForm';
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
// <<<<<<< HEAD
//       <Route path="registration_form" component={RegistrationForm}/>
//         <Route path="login" component={LogIn}/>
//         <Route path="loggedIn" component={LoggedIn}/>
//
//     </Route>
//
// =======
      <Route path="login" component={LoginForm}/>
      <Route path="registration" component={RegistrationForm}/>
    </Route>
    <Route path="forgotpassword" component={ForgotPassword}/>
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
  </Router>,
  document.getElementById('app')
);
