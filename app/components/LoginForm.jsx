import React from 'react';
import firebase from '../configuration/firebase-config.js';
import Input from './common/InputField';
import { Link } from 'react-router';

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();


var LogInForm = React.createClass({

  login: function (email, password) {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      if (email.length < 4) {
        consol.log('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        console.log('Please enter a password.');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).then((firebaseUser)=>{
        var uid = firebaseUser.uid;
        var email = firebaseUser.email;
        var emailVerified = firebaseUser.emailVerified;
        console.log(emailVerified,uid,email);
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
      }
  },

      LogIn: function(Provider){
        firebase.auth().signInWithPopup(Provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        //console.log(user.email,user.uid,user.emailVerified);
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  },

      //Google
      googleSignIn: function () {
        this.LogIn(googleProvider);
      },

      //Facebook
      facebookSignIn: function () {
        this.LogIn(facebookProvider);
      },

      //LinkedIn
      linkedInSignIn: function() {
      // var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');

        
      },


  onFormSubmit: function () {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue(); 
    this.login(email,password);
  },

  validateUserName: function (value) {
    return value != "";
  },

  validateEmail: function (value) {
    var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailExpression.test(value);
  },

  validatePassword: function (value) {
    return value.length >= 6;
  },

  render: function () {
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
                <button  className="loginBtn loginBtn--google" onClick={this.googleSignIn}>Google</button>
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
});

module.exports = LogInForm;
