import React from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios';

import Svg from './common/Svg.jsx'
import Topiclink from './common/Topiclink.jsx'

export default class Coursepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
			"data" : false
		}
		this.selectChapter = (num) => {
			let newState = Object.assign({}, this.state);
			newState.chapterSelected = num;
			this.setState(newState);
		}
    }

		componentDidMount() {
			axios.get("https://api.myjson.com/bins/r7xib").then(res => {
				let newState = Object.assign({}, res.data);
				newState.data = true;
				this.setState(newState);
			});
		}

    render(match) {
    	var course = this.state.course
		if(this.state.data) {
        return (
            <div>
                <div className="course-intro row">
	<div className="title section-title">
		{course.name}
	</div>
	<div className="from">
	{course.authors.map((auth,i) => {
		const delimiter = ((i < course.authors.length-2) ? ',' : (i === course.authors.length-2) ? '&': '');
		return (
			<span key={i}>
			<Link className="name" to={auth.link}>{auth.name}</Link> {delimiter} </span>
			)
	})}
		 | {course.duration}
	
	</div>
	<div className="description">
		{course.description}
	</div>
	<div className="share-buttons">
		<a href={course.share.google}><img alt="" src="/images/icons/facebook.png"/></a> <a href={course.share.facebook}><img alt="" src="/images/icons/linkedin.png"/></a> <a href={course.share.facebook}><img alt="" src="/images/icons/twitter.png"/></a>
	</div>
</div>
<div className="course-description">
	<div className="row">
		<div className="column large-12 row">
			<div className="large-3 column nil-padding">
				<ul className="chapter-names">
					{course.content.map((chapter, i) => {
						
						return (
							<li 
							key={i}
							onClick={()=>{this.selectChapter(i)}}
							className={this.state.chapterSelected === i ? 'active' : ''} key={i}>
								<span className="name">{chapter.chapterName}</span> 
								<Svg/>
							</li>
							)
					})}
				</ul>
			</div>
			<div className="large-7 end column nil-padding topics">
				<div className="selected-content">
					<ul className="topic-level pipe">
						{this.state.course.content[this.state.chapterSelected].content.map((topic, i) => {
							return <Topiclink {...topic} key={i} />
						})}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
            </div>
        )
		}	else {
			return (
				<p> Loading... </p>
			)
		}
    }
}