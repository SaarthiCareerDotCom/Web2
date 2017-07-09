import React from 'react';
import { Link, IndexLink } from 'react-router';

class Nav extends React.Component {
  onSearch(e) {
    e.preventDefault();
    alert('Not yet wired up!');
  }

  render() {
    return (
        <div className="header fullWidth">
    <div className="row">
      <div className="columns large-2 logo">
        Saarthi
      </div>
      <div className="columns large-4 header-menu">
        <div className="notification">
          <div className="notify">
            <ul>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="course">A new test is available</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="qa">You have got a new reply</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="course">A new test is available</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="qa">You have got a new reply</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="course">A new test is available</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="qa">You have got a new reply</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="course">A new test is available</li>
              <li className="schedule">Your class has been rescheduled</li>
              <li className="qa">You have got a new reply</li>
            </ul>
          </div>
        </div>
        <div className="name">
          John Doe <span className="options"></span>
          <div className="header-dropdown">
            <span className="options"></span>
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
