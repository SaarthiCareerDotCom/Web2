import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter, Switch} from 'react-router-dom';

import Main from 'Main';
import ForgotPassword from './components/ForgotPassword.jsx';
import Loginformm from './components/Loginformm';
import RegistrationForm from 'RegistrationForm';
import Home from './components/Home.jsx';
// Load foundation
require('./styles/app.scss');
$(document).foundation();

ReactDOM.render(
  <HashRouter>
  	<div>
  	<Switch>
    	<Route exact path="/" component={Main}></Route>
    	<Route exact path="/login" component={Loginformm}/>
    	<Route exact path="/registration" component={RegistrationForm}/>
    	<Route exact path="/home" component={Home}/>
    	<Route exact path="/forgotpassword" component={ForgotPassword}/>
	</Switch>
	</div>
  </HashRouter>,
  document.getElementById('app')
);
