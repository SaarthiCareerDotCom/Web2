import React from "react";
import {Link} from 'react-router-dom';

export default class Topiclink extends React.Component {
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
				<Link className={`typeIcon ${this.props.type}`} to={`/topic/${this.props.id}`}>{this.props.topicName}</Link>
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