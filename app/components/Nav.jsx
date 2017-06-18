var React = require('react');
var {Link, IndexLink} = require('react-router');
import firebase from '../configuration/firebase-config';

var Nav = React.createClass({


  render: function () {
    var user = firebase.auth().currentUser;
console.log(user);

    return (

      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Saarthi Career</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form  >
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
});

module.exports = Nav;
