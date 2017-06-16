import React from 'react';
import firebase from '../configuration/firebase-config.js';
import Input from './common/InputField';
import { Link } from 'react-router';
import UserDashboard from '../components/UserDashboard';

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();


var LogInForm = React.createClass({

  getInitialState: function () {
    return {
      loginError: "",
      steps: 1
    }
  },

  setInitialState: function () {
    this.setState({
      loginError: ""
    });
  },
  
  loginViaEmail: function (email, password) {
    var _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then((firebaseUser) => {
      this.setState({
        steps: this.state.steps + 1
      })
    }).catch(function (error) {
      console.log(error);
      _this.setState({
        loginError: error.message
      })
    });
  },

  loginViaSocialMedia: function (Provider) {
    var _this = this;
    firebase.auth().signInWithPopup(Provider).then(function (result) {
      var token = result.credential.accessToken;
      var current_user = result.user;
    }).catch(function (error) {
      _this.setState({
        loginError: error.message
      });
    });
  },

  //Google
  googleSignIn: function () {
    this.loginViaSocialMedia(googleProvider);
  },

  //Facebook
  facebookSignIn: function () {
    this.loginViaSocialMedia(facebookProvider);
  },

  //LinkedIn
  linkedInSignIn: function () {
    // var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
  },



  onFormSubmit: function () {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    this.setInitialState();
    this.loginViaEmail(email, password);
  },


  render: function () {
    if (this.state.steps == 1) {
      return (
        <div className="login-box">
          <form>
            <div className="row collapse expanded">
              <div className="small-12 large-6 column small-order-2 medium-order-1">
                <div className="login-box-form-section">
                  <h1 className="login-box-title">Login</h1>
                  <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                    errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                  <Input className="login-box-input" type="password" name="password" placeholder="Password"
                    errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                  <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Login" />
                  {this.state.loginError && <p>{this.state.loginError}</p>}
                  <div>Donnot have an account?<Link to={'/registration'}>create one</Link></div>
                  <div ><Link to={'/forgotpassword'}>Forgot Password</Link></div>
                </div>
              </div>
              <div className="small-12 large-6 column small-order-2 medium-order-1 login-box-social-section">
                <div className="login-box-social-section-inner">
                  <span className="login-box-social-headline">Sign in with<br />your social network</span>
                  <button className="loginBtn loginBtn--facebook" onClick={this.facebookSignIn}>Facebook</button>
                  <br />
                  <br />
                  <button className="loginBtn loginBtn--google" onClick={this.googleSignIn}>Google</button>
                  <br />
                  <br />
                  <button className="loginBtn loginBtn--linkdin" onClick={this.linkedInSignIn}>LinkedIn</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
    else {
      return <UserDashboard />
    }
  }
});

module.exports = LogInForm;
