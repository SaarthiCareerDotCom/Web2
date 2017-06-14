var React = require('react');

import firebase from '../configuration/firebase-config'



console.log('1');
var UserDashboard = React.createClass({
  render:function()
  {


var User_uid = firebase.auth().currentUser;
console.log(User_uid.uid);
    return(
      <div>
  <h1>welcome { User_uid.email } </h1>
    <form action='users/payment' method ="post">
    <input type="submit" value="instamojo" />
</form>
</div>
    );
  }
});
module.exports= UserDashboard;
