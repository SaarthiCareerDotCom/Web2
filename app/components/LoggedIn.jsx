var React = require('react');
//var aUser = require('aUser');
//var aUser = require('collect_user');
import firebase from '../configuration/firebase-config'



console.log('1');
var LoggedIn = React.createClass({
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
module.exports= LoggedIn;
