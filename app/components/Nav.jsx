var React = require('react');
var {Link, IndexLink} = require('react-router');
import firebase from '../configuration/firebase-config';

var Nav = React.createClass({
  getInitialState: function () {
    return {
        steps: 1
    }

  },

logout_user : function(e){
  e.preventDefault();
  firebase.auth().signOut().then(function() {
  console.log('signed out');
 this.setState({
      steps: this.state.steps + 2
  })


}).catch(function(error) {

});
},


  render: function () {
    var user = firebase.auth().currentUser;
console.log(user);
  if((user == undefined ) && (this.state.steps == 1))
  {
    return (

      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Saarthi Career</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.logout_form} >
            <ul className="menu">
              <li>
                <Link to="/login">
                <input type="submit" className="button" value="LogIn"/>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }

  else {
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Saarthi Career</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form >
            <ul className="menu">
              <li>

                <input type="submit" className="button" value="Logout"/>

              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
  }
});

module.exports = Nav;
