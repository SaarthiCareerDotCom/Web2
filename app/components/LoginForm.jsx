import React from 'react';
import Input from './common/InputField';
import { Link } from 'react-router';


var LogInForm = React.createClass({

  onFormSubmit: function () {

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
                <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
                <br />
                <br />
                <button type="button" className="loginBtn loginBtn--google">Google</button>
                <br />
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

module.exports = LogInForm;
