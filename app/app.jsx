import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import ForgotPassword from './components/ForgotPassword.jsx';
import LoginForm from 'LoginForm';
import RegistrationForm from 'RegistrationForm';
// Load foundation
require('./styles/app.scss');
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
