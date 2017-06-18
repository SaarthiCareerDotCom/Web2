var Nav_logout = require('Nav_logout');
var React = require('react');
import { Link } from 'react-router';
import firebase from '../configuration/firebase-config';
var username,college,branch,contactno;
var userDetailsPage = React.createClass({
  getInitialState: function () {
    return {
            steps :1,

      }
  },
getUserDetails : function(){

var _this = this;
  console.log('something');
  fetch('http://localhost:3000/users/user_details', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      id:firebase.auth().currentUser.uid

    })
  }).then(function(res){
      console.log('getting data');
          return res.json();

  }).then(function(data){
    console.log('done');
    username = data.username;
    console.log(username);
          console.log(data);
          username = data.username;
          branch =data.branch;
          college = data.college;
          contactno = data.contactno;
          _this.setState({
            steps : _this.state.steps +1
          });

        })
  .catch(function(error){
    console.log(error);
  });

},

render : function(){
  if(this.state.steps == 1){
  return (

<div>
<div> {this.getUserDetails()} </div>

<Nav_logout />
  <Link to={'/UserDashboard'}>
    <input type="button" value="Back" />
      </Link>
      <Link to={'/updateProfile'}>
        <input type="button" value="update your profile" />
          </Link>

</div>

);
}
else{
  return (

<div>


<Nav_logout />
  <Link to={'/UserDashboard'}>
    <input type="button" value="Back" />
      </Link>
      <Link to={'/updateProfile'}>
        <input type="button" value="update your profile" />
          </Link>
          <h3>Name : { username }</h3>
          <br />
            <h3>College :{ college }</h3>
              <br />
                <h3>Branch :{ branch }</h3>
                  <br />
                    <h3>contact Info :{ contactno }</h3>

</div>

);
}
}



});

module.exports = userDetailsPage;
