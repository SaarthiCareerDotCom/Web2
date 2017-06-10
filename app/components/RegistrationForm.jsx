import React from 'react';
import firebase from '../configuration/firebase-config'
var {Link} = require('react-router');
var RegistrationForm = React.createClass({

  register: function (email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          console.log(errorMessage);
        } else {
          console.log(errorMessage);
        }
        console.log(error);
      });
    },

  onFormSubmit: function(e) {
    e.preventDefault();
    var username=this.refs.name.getValue();
    var email=this.refs.email.getValue();
    var password=this.refs.password.getValue();
    var repassword=this.refs.password2.getValue();
    console.log(username, email, password, repassword);
//    console.log(username,email,password);
console.log(username);
    this.register(email,password);
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
        <form onSubmit={this.onFormSubmit} method ="post">
          <div className="row collapse expanded">
            <div className="small-12 large-6 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">Sign up</h1>
                <Input ClassName="login-box-input" type="text" name="username" placeholder="Username"
                  errorMessage="Name field cannot be empty" validate={this.validateUserName} ref="name" />
                <Input ClassName="login-box-input" type="email" name="email" placeholder="E-mail"
                  errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                <Input ClassName="login-box-input" type="password" name="password" placeholder="Password"
                  errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                <Input ClassName="login-box-input" type="password" name="password2" placeholder="Retype password"
                  errorMessage="confirmed password doesnot match with password" validate={this.validateConfirmPassword} ref="password2" />
                <Input ClassName="login-box-submit-button" type="submit" name="signup_submit" value="Sign me up" />
  <div ClassName="login-box-title">Already Have an Account?<Link to={'/login'}>Login</Link></div>
              </div>

            </div>
            <div className="small-12 medium-6 column small-order-1 medium-order-2 login-box-social-section">
              <div className="login-box-social-section-inner">
                <span className="login-box-social-headline">Sign in with<br />your social network</span>
                  <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
                  <br />
                    <br />
                      <br />
                      <button type="button" className="loginBtn loginBtn--google">Google</button>
                        <br />
                          <br />
                            <br />
                      <button type="button"  className="loginBtn loginBtn--linkdin">LinkedIn</button>
              </div>
            </div>
            </div>
          </form>
        </div>
    );
  }
});

var Input = React.createClass({
  getDefaultProps: function () {
    return {
      className: "",
      type: "text",
      name: "",
      placeholder: "",
      validate: null
    }
  },

  getInitialState: function () {
    return {
      value: null,
      errorMessage: "",
      errorVisible: false
    }
  },
  validation: function (value, valid) {
    var message = "";
    var errorVisible = false;
    if (valid == false) {
      message = this.props.errorMessage;
      errorVisible = true;
    }
    this.setState({
      value: value,
      errorMessage: message,
      errorVisible: errorVisible
    });
  },

  getValue: function () {
    return this.refs.input.value;
  },

  handleFocusChange: function (event) {
    if (this.props.validate) {
      var valid = this.props.validate(event.target.value);
    }
    this.validation(event.target.value, valid);
  },
  render: function () {
    return (
      <div>
        <input className={this.props.ClassName} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} onBlur={this.handleFocusChange} ref="input" />
        {this.state.errorVisible && <div>{this.props.errorMessage}</div>}
      </div>
    );
  }
});
module.exports = RegistrationForm;
