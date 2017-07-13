import React from "react";
import Nav from "Nav";
import Enrolledcourses from "./Enrolledcourses";
import Promotion from "./Promotion";
import Blogs from "./Blogs";
import Coursepage from "./Coursepage";
import {Route, Switch} from 'react-router-dom';

import axios from "axios";

class Homedata extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Enrolledcourses courses={this.props.data.coursesEnrolled} />
        <Promotion slides={this.props.data.promotion}/>
        <Blogs blogs={this.props.data.blogs} blogLink={this.props.data.blogLink}/>
      </div>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageText: {
        name: "",
        coursesEnrolled: [],
        promotion: [],
        blogs: [],
        blogLink: ""
      },
      notifications: {}
    };
  }

  componentDidMount() {
    axios.get("https://api.myjson.com/bins/66x1f").then(res => {
      let newState = Object.assign({}, this.state);
      newState.pageText = res.data;
      this.setState(newState);
    });
  }
  render() {
    return (
      <div>
        <Nav name={this.state.pageText.name} />
        <Route path="/home" render={(props) => (
          <Homedata {...props} data={this.state.pageText} />
        )}/>
        <Route path="/course/:name" render={(props) => (
          <Coursepage {...props}/>
        )}/>
        
      </div>
    );
  }
}

export default Home;