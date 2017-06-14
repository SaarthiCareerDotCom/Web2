var React = require('react');

import firebase from '../configuration/firebase-config'
// console.log('1');
var UserDashboard = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();
    firebase.auth().signOut().then(()=>{console.log("user Signed out");}).catch((err)=>{console.log(err);})
  },

  render:function()
  {
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    var userDetails;
    // console.log(user);
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : user.uid
      })
    })
    .then(function (res) {
      console.log('fetched from database');
      return res.json();
    })
    .then(function (userDetailsFromDatabase) {
      // userDetails = userDetailsFromDatabase;
      console.log(userDetailsFromDatabase);
  });

    return(
      <div>
        <h1>welcome { user.uid} </h1>
        <form action='users/payment' method ="post">
          <input type="submit" value="instamojo" />
        </form>
        <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Log out" />
      </div>
    );
  }
});
module.exports= UserDashboard;
