var React = require('react');

import firebase from '../configuration/firebase-config';
import Input from './common/InputField';
var UserDashboard = React.createClass({


  validateAmount: function (value) {
    return value > 20;
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    firebase.auth().signOut().then(()=>{console.log("user Signed out");}).catch((err)=>{console.log(err);})
  },

  onPaymentSubmit: function () {
    var amount = this.refs.amount.getValue();
    fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.user.uid,
        email: this.userDetails.email,
        username: this.userDetails.username,
        amount : amount,
        purpose : 'buy',
        phone: this.phone
      })
    })
    .then(function (res) {
      console.log('payment request');
    });
    return false;
  },

  getUserDetails : function(){
    this.user = firebase.auth().currentUser;
    var _this = this;

    console.log(this.user.uid);
    // var userDetails;
    // console.log(user);
    fetch('http://localhost:3000/api/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.user.uid
      })
    })
    .then(function (res) {
      console.log('fetched from database');
      return res.json();
    })
    .then(function (userDetailsFromDatabase) {
      _this.userDetails = userDetailsFromDatabase;
      console.log(_this.userDetails);
  });
},

  render:function()
  {
    return(
      <div>
        <div>{this.getUserDetails()}</div>
        <h1>welcome { this.userDetails.username} </h1>


        <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Log out" />
        <Input className="login-box-input" type="text" name="amount" placeholder="Amount"
          errorMessage="Amount must be greater than INR 20.00" validate={this.validateAmount} ref="amount" />
        <input className="login-box-submit-button" type="button" onClick={this.onPaymentSubmit} value="PAY" />

      </div>
    );
  }


});
module.exports= UserDashboard;
