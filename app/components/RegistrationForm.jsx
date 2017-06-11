import React from 'react';
import firebase from '../configuration/firebase-config';
import Input from './common/InputField';
import { Link } from 'react-router';
var RegistrationForm = React.createClass({
  register: function (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      var errorMessage = error.message;
    });
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    var username = this.refs.name.getValue();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var repassword = this.refs.password2.getValue();
    this.register(email, password);
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

  validateConfirmPassword: function (value) {
    return this.refs.password.getValue() === value;
  },

  render: function () {
    return (
      <div className="login-box">
        <form>
          <div className="row collapse expanded">
            <div className="small-12 large-6 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">Sign up</h1>
                <Input className="login-box-input" type="text" name="username" placeholder="Name"
                  errorMessage="Name field cannot be empty" validate={this.validateUserName} ref="name" />
                <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                  errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                <Input className="login-box-input" type="password" name="password" placeholder="Password"
                  errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                <Input className="login-box-input" type="password" name="password2" placeholder="Retype password"
                  errorMessage="confirmed password doesnot match with password" validate={this.validateConfirmPassword} ref="password2" />
                <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Sign me up" />
                <div>Already Have an account?<Link to={'/login'}>LogIn</Link></div>
              </div>
            </div>
            <div className="small-12 large-6 column small-order-2 medium-order-1 login-box-social-section">
              <div className="login-box-social-section-inner">
                <span className="login-box-social-headline">Sign in with<br />your social network</span>
                <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
                <br />
                <button type="button" className="loginBtn loginBtn--google">Google</button>
                <br />
                <button type="button" className="loginBtn loginBtn--linkdin">LinkedIn</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = RegistrationForm;
