import React from 'react';
import firebase from '../../common/firebase-config';

var ForgotPassword = React.createClass({

  passwordreset: function(email){
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Password Reset Email Sent!');
        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.refs.email.value;
    console.log(email);
    this.passwordreset(email);
  },

  render: function () {
    return (
      <div className="login-box">
        <form onSubmit={this.onFormSubmit}>
          <div className="row  ">
            <div className="small-12 large-5 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">Forgot Password</h1>
                <input className="login-box-input" type="email" name="email" placeholder="E-mail" ref ="email"/>
                <input type="button" className="button primary" onClick={this.onFormSubmit} value="Submit"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
module.exports = ForgotPassword;
