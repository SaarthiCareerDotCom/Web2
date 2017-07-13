import React from 'react'

import axios from 'axios';

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
	}
}
    }
    render(match) {
        return (
            <div>
                <div className="course-intro row">
	<div className="title section-title">
		{this.state.course.name}
	</div>
	<div className="from">
	{this.course.authors.map((auth,i) => {
		return (
			<a className="name" href="google.com">Tom Braun</a> {i < this.course.authors.length-1 ? ',' : i === this.course.authors.length-1 : '&', ''}
			)
	})}
		<a className="name" href="google.com">Tom Braun</a> & <a className="name" href="google.com">Delphine Dora</a> | 52 hours
	}
	}
	</div>
	<div className="description">
		Data structures can implement one or more particular abstract data types (ADT), which specify the operations that can be performed on a data structure and the computational complexity of those operations. In comparison, a data structure is a concrete implementation of the specification provided by an ADT.
	</div>
	<div className="share-buttons">
		<a href="google.com"><img alt="" src="/assets/img/icons/facebook.png"/></a> <a href="google.com"><img alt="" src="/assets/img/icons/linkedin.png"/></a> <a href="google.com"><img alt="" src="/assets/img/icons/twitter.png"/></a>
	</div>
</div>
<div className="course-description">
	<div className="row">
		<div className="column large-12 row">
			<div className="large-3 column nil-padding">
				<ul className="chapter-names">
					<li>
						<span className="name">Introduction</span> <svg className="pie" style={{"transform": "rotate(-90deg)"}} viewbox="-1 -1 2 2"></svg>
					</li>
					<li>
						<span className="name">Popular data structures in use</span> <svg className="pie" style={{"transform": "rotate(-90deg)"}} viewbox="-1 -1 2 2"></svg>
					</li>
					<li className="active">
						<span className="name">Introduction</span> <svg className="pie" style={{"transform": "rotate(-90deg)"}} viewbox="-1 -1 2 2"></svg>
					</li>
					<li>
						<span className="name">Introduction</span> <svg className="pie" style={{"transform": "rotate(-90deg)"}} viewbox="-1 -1 2 2"></svg>
					</li>
					<li>
						<span className="name">Introduction</span> <svg className="pie" style={{"transform": "rotate(-90deg)"}} viewbox="-1 -1 2 2"></svg>
					</li>
				</ul>
			</div>
			<div className="large-7 end column nil-padding topics">
				<div className="selected-content">
					<ul className="topic-level pipe">
						<li className="finished">
							<a className="typeIcon text" href="/topic">What is data Structures</a>
						</li>
						<li className="finished">
							<a className="typeIcon text" href="/topic">What is data Structures</a>
						</li>
						<li>
							<a className="typeIcon video" href="/topic">What is data Structures</a>
						</li>
						<li className="finished">
							<a className="typeIcon video" href="/topic">What is data Structures</a>
							<ul className="pipe">
								<li>
									<a className="typeIcon text" href="/topic">What is data Structures</a>
								</li>
								<li>
									<a className="typeIcon text" href="/topic">What is data Structures</a>
								</li>
								<li>
									<a className="typeIcon text" href="/topic">What is data Structures</a>
								</li>
							</ul>
						</li>
						<li>
							<a className="typeIcon text" href="/topic">What is data Structures</a>
						</li>
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