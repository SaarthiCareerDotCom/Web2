var Nav_logout = require('Nav_logout');
var React = require('react');
import { Link } from 'react-router';
import firebase from '../configuration/firebase-config'
var updateProfile = React.createClass({

  update :function(e){
    e.preventDefault();

    var User_updates = {
      'username' : this.refs.name.value,
      'college' : this.refs.college.value,
      'branch' : this.refs.branch.value,
      'contactno' : this.refs.contactno.value,
      'id' : firebase.auth().currentUser.uid
    };
    console.log(User_updates);
    fetch('http://localhost:3000/users/updateProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: User_updates.username,
        college: User_updates.college,
        branch : User_updates.branch,
        contactno :User_updates.contactno,
        id:User_updates.id

      })
    }).then(function(res){
      return res.json();
    }).then(function (status) {
      console.log(status);
    })
    .catch(function(error){
      console.log(error);
    });


  },

render: function(){
return(
  <div>
  <div>
  <Nav_logout />
    <Link to={'/userDetails'}>
      <input type="button" value="Back" />
        </Link>

  </div>
  <h3>Update details</h3>
  <div className="row" >
    <div className="small-4 large-4 columns">
      <form >
    <div className="card-section">
      <label >Name</label>
      <input className="input" type="text" name="name" placeholder="name" ref ="name"/>
      <label >College</label>
         <input className="input1" type="text" name="college" placeholder="college" ref ="college" />
         <label >Branch</label>
         <input className="input2" type="text" name="branch" placeholder="branch" ref ="branch" />
         <label >ContactNo</label>
         <input className="input3" type="number" name="contactno" placeholder="contactno" ref ="contactno"  />
         <button type="button" className="success button centre" onClick={this.update}>Submit</button>
    </div>
    </form>
    </div>
  </div>
</div>
);

}

});

module.exports = updateProfile;
