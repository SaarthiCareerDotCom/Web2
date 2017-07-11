import React from 'react';
import firebase from '../../common/firebase-config.js';
import { Link, IndexLink, Redirect } from 'react-router-dom';
import axios from "axios";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications : [],
      notificationShow : false,
      settingShow : false,
      logout: false
    };
    this.toggleShow = (modal) => {
      let newState = Object.assign({},this.state);
      newState[modal] = !newState[modal];
      this.setState(newState);
    }
    this.toggleNotification = () => {
      this.toggleShow("notificationShow");
    }
    this.toggleSettings = () => {
      this.toggleShow("settingShow");
    }
    this.signOut = () => {
      debugger;
      var that = this;
      firebase.auth().signOut().then(function() {
        console.log('sign out');
        let newState = Object.assign({}, that.state);
        newState.logout = true;
        that.setState(newState);
      }).catch(function(error) {
        console.log('error');
});
    }
  }

  componentDidMount() {
    axios.get("https://api.myjson.com/bins/eh22b").then(res => {
      let newState = Object.assign({}, this.state);
      newState.notifications = res.data.notifications;
      this.setState(newState);
    });
  }

  render() {
    return this.state.logout ? (
      <Redirect to={{
        pathname: '/login',
      }}/>
    ) : (
      <div className="header fullWidth">
    <div className="row">
      <div className="columns large-2 logo">
        Saarthi
      </div>
      <div className="columns large-4 header-menu">
        <div className={`notification ${this.state.notificationShow ? 'open' : ''}`} onClick={this.toggleNotification}>
          <div className="notify">
            <ul>
              {this.state.notifications.map((msg, i) => {
                return (
                    <li key={i} className={msg.type}><a href={msg.link}>{msg.text}</a></li>
                  )
              })}
            </ul>
          </div>
        </div>
        <div className="name" onClick={this.toggleSettings}>
          {this.props.name} <span className={`options ${this.state.settingShow ? 'open' : ''}`}>
          <div className="header-dropdown">
            <ul>
              <li><span className="options"><a href="#">Profile</a></span></li>
              <li><span className="options"><a href="#">Settings</a></span></li>
              <li><span className="options" onClick={this.signOut}><a>Sign Out</a></span></li>
            </ul>
          </div>
          </span>
        </div>
      </div>
    </div>
  </div>
    );
  }
};

export default Nav;
