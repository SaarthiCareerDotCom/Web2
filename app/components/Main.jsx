import React from 'react';
import Nav from 'Nav';
import Enrolledcourses from './Enrolledcourses';
import Promotion from './Promotion';
import Blogs from './Blogs';

import axios from 'axios';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		axios.get('https://api.myjson.com/bins/szk67')
			.then(res => {
				console.log(res.data.someone);
			})
	}
	render(){
		return (
			<div>
				<Nav/>
				<Enrolledcourses/>
				<Promotion/>
				<Blogs/>
		    </div>
	    );
	}
}

export default Main;
