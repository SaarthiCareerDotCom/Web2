var React = require('react');
var {Link, IndexLink} = require('react-router');

import firebase from '../configuration/firebase-config'
var Nav = require('Nav');
var Nav_logout = React.createClass({
  onSearch: function (e) {
      e.preventDefault();
      firebase.auth().signOut().then(function(){
        console.log('user signed out');

      }).catch(function(error){
        console.log(error);
      });
      this.setState({
        steps : this.state.steps + 1
      });
  },

  getInitialState: function () {
    return {
      steps :1
    }

  },
  render: function () {
    if(this.state.steps == 1){
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Saarthi Career</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.onSearch}>
            <ul className="menu">
              <li>
                <Link to= {'/'}>
                <input type="submit" className="button" value="Logout"/>
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
      <Nav />
    );
  }
}

});

module.exports = Nav_logout;
