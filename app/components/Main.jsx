import React from "react";
import Nav from "Nav";
import Enrolledcourses from "./Enrolledcourses";
import Promotion from "./Promotion";
import Blogs from "./Blogs";

import axios from "axios";

class Main extends React.Component {
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
        <Enrolledcourses courses={this.state.pageText.coursesEnrolled} />
        <Promotion slides={this.state.pageText.promotion}/>
        <Blogs blogs={this.state.pageText.blogs} blogLink={this.state.pageText.blogLink}/>
      </div>
    );
  }
}

export default Main;
