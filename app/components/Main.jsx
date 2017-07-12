import React from "react";
import Nav from "Nav";
import { Link } from "react-router-dom"

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav />


        <Link to='/login'>The login Button</Link>

        <p>This page will have publically accessbile data</p>

      </div>
    );
  }
}

export default Main;
