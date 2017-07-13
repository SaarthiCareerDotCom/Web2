import React from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios';

class Svg extends React.Component {
	constructor(props) {
		super(props);
		var that = this;
		this.getCoordinatesForPercent = (percent) => {
		  const x = Math.cos(2 * Math.PI * percent);
		  const y = Math.sin(2 * Math.PI * percent);
		  return [x, y];
		}
		const perc = this.props.perc || 0.3;

		this.slices = [{"percent":perc,"color":"#3fa9f5"},{"percent":1-perc,"color":"#f8e709"}];
		this.cumulativePercent = 0;
		this.paths = []
		
		this.slices.map((slice, i) => {
			  // destructuring assignment sets the two variables at once
			  const [startX, startY] = that.getCoordinatesForPercent(that.cumulativePercent);
			  
			  // each slice starts where the last slice ended, so keep a cumulative percent
			  that.cumulativePercent += slice.percent;
			  
			  const [endX, endY] = that.getCoordinatesForPercent(that.cumulativePercent);

			  // if the slice is more than 50%, take the large arc (the long way around)
			  const largeArcFlag = slice.percent > .5 ? 1 : 0;

				// create an array and join it just for code readability
			  const pathData = [
			    `M ${startX} ${startY}`, // Move
			    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
			    `L 0 0`, // Line
			  ].join(' ');

			  // create a <path> and append it to the <svg> element
			  // const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			  // pathEl.setAttribute('d', pathData);
			  // pathEl.setAttribute('fill', slice.color);
			  that.paths.push({
			  	d: pathData,
			  	fill: slice.color
			  });
			});
		}

	render() {
		return (
			<svg className="pie" viewBox="-1 -1 2 2" style={{"transform": "rotate(-90deg)"}}>
				{this.paths.map((path, i) => {
					return <path key={i} d={path.d} fill={path.fill}></path>
				})}
			</svg>
		)
	}
	
}

class Topiclink extends React.Component {
	constructor(props){
		super(props);
		this.isRead = (props) => {
			let result = true;
			if(typeof this.props.subTopics !== 'undefined') {
				this.props.subTopics.map((subtopic, i) => {
					result = result && subtopic.read;
				});
			}	else {
				result = this.props.read;
			}
			return result?'finished':'';

		}
	}

	render(){
		return (
			<li className={this.isRead(this.props)}>
				<a className={`typeIcon ${this.props.type}`} href={`/topic/${this.props.id}`}>{this.props.topicName}</a>
				{ this.props.subTopics && 
					<ul className="pipe">
					{this.props.subTopics.map((subtopic, i) => {
						return (
								
									<Topiclink {...subtopic} />
								
							)
					})}
					</ul>
				 }
			</li>
		)
	}
	
}

export default class Coursepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
			"course" : {
				"code" : "Py101",
				"name" : "data sturctures and algorithms",
				"authors" : [
					{
						"name" : "Tom Braun",
						"link" : "/profile/tom"
					},{
						"name" : "Delphine",
						"link" : "/profile/delphine"
					},{
						"name" : "Rotwan",
						"link" : "/profile/rtw"
					}
				],
				"duration" : 52,
				"description" : "Data structures can implement one or more particular abstract data types (ADT), which specify the operations that can be performed on a data structure and the computational complexity of those operations. In comparison, a data structure is a concrete implementation of the specification provided by an ADT.",
				"share" : {
					"google" : "google/share",
					"facebook" : "facebook/share",
					"linkedin" : "linkedin/share"
				},
				"content" : [{
					"chapterName" : "Introduction",
					"content" : [
						{
							"topicName" : "What is DS",
							"type" : "video",
							"id" : "ds101",
							"read" : true
						},{
							"topicName" : "What to expect",
							"type" : "text",
							"id" : "ds102",
							"read" : false
						}
					] 
				}, {
					"chapterName" : "Popular Data Structure in use",
					"content" : [
						{
							"topicName" : "Trees",
							"type": "group",
							"subTopics" : [
								{
									"topicName" : "What is DS",
									"type" : "video",
									"id" : "ds103",
									"read" : true
								},{
									"topicName" : "What to expect",
									"type" : "text",
									"id" : "ds104",
									"read" : false
								},{
									"topicName" : "What to expect",
									"type" : "text",
									"id" : "ds105",
									"read" : true
								},{
									"topicName" : "What to expect",
									"type" : "text",
									"id" : "ds106",
									"read" : false
								}
							]
						}
					]
				}]
			},
			"chapterSelected" : 0
		}
		this.selectChapter = (num) => {
			let newState = Object.assign({}, this.state);
			newState.chapterSelected = num;
			this.setState(newState);
		}
    }

    render(match) {
    	var course = this.state.course
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
		<a href={course.share.google}><img alt="" src="/assets/img/icons/facebook.png"/></a> <a href={course.share.facebook}><img alt="" src="/assets/img/icons/linkedin.png"/></a> <a href={course.share.facebook}><img alt="" src="/assets/img/icons/twitter.png"/></a>
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
    }
}