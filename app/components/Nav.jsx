import React from 'react';
import { Link, IndexLink } from 'react-router';
import axios from "axios";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications : [],
      notificationShow : false,
      settingShow : false
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
  }

  componentDidMount() {
    axios.get("https://api.myjson.com/bins/eh22b").then(res => {
      let newState = Object.assign({}, this.state);
      newState.notifications = res.data.notifications;
      this.setState(newState);
    });
  }

  render() {
    return (
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
          {this.props.name} <span className="options" className="options"></span>
          <div className="header-dropdown">
            <span className={`options ${this.state.notificationShow ? 'open' : ''}`}></span>
            <ul>
              <li><span className="options"><a href="#">Profile</a></span></li>
              <li><span className="options"></span></li>
              <li><span className="options"><a href="#">Settings</a></span></li>
              <li><span className="options"></span></li>
              <li><span className="options"><a href="#">Logout</a></span></li>
              <li><span className="options"></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
};

export default Nav;
