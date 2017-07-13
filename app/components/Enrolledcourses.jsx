import React from 'react';
import { Link } from 'react-router-dom';
import Equalizeheight from './common/Equalizeheight';

export default class Enrolledcourses extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			heightEl : 'inital'
		}
		this.updateHeight = () => {
			let elements = document.querySelectorAll('.course-list .title');
			elements = Array.prototype.slice.call(elements);
			let max = 0;
			if(elements.length == 0) {
				return;
			}
			elements.map((el, i) => {
				if(el.clientHeight > max) {
					max = el.clientHeight;
				}
			});
			let newState = Object.assign({}, this.state);
			newState.heightEl = max + 'px';
			this.setState(newState);
		}
	}
	componentDidMount() {
		this.updateHeight();
	}
	shouldComponentUpdate() {
		if(this.state.heightEl !== 'inital') {
			return false;
		}	else 	{
			return true;
		}
	}
	componentDidUpdate() {
		this.updateHeight();
	}
	render(){
		var that = this;
		return(
		<section className="courses fullWidth">
	<div className="row">
		<div className="tab active">
			<span>COURSE</span>
		</div>
		<div className="tab">
			<span>POINTS</span>
		</div>
	</div>
	<div className="row course-list">
		{this.props.courses.map((course, i) => {
			return (
				<div className="course-tile" key={i}>
			<div className="container">
				<Link to={`/course/${course.code}`} className="title" style={{"height": `${that.state.heightEl}`}}>{course.title}</Link>
				<hr className="divider"/>
				<div className="status">
					{course.completed ? course.completed[0] + '/' + course.completed[1] : 'New Course'}
				</div>
				<div className="continue active"  style={{"visibility" : `${course.completed ? "visible" : "hidden"}`}}>
					continue from
				</div><a className="action" href={`/course/${ course.next ? course.next.code : course.code }`}>{course.next ? course.next.topic : 'START'}</a>
			</div>
		</div>
				)
		})}
		
		
	</div>
</section>);
	}
};