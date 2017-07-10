import React from 'react';
import { Link } from 'react-router';

export default class Blogs extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		if(this.props.blogs.length >= 3) {
			return(
						<section className="blogs">
				    <div className="row">
				        <p className="section-title">What's New</p>
				        <div className="column large-12 block-container">
				            <div className="largest" style={{"backgroundImage" : `url(${this.props.blogs[0].image})`}}>
				                <div className="pic-info">
				                    <p className="tag career">{this.props.blogs[0].tags}</p>
				                    <div className="title open-condensed">{this.props.blogs[0].title} <span className="by">~{this.props.blogs[0].author}</span> </div>
				                </div>
				            </div>
				            <div className="largest">
				                <div className="larger time" style={{"backgroundImage" : `url(${this.props.blogs[1].image})`}}>
				                    <div className="pic-info">
				                        <p className="tag career">{this.props.blogs[1].tags}</p>
				                        <div className="title open-condensed">{this.props.blogs[1].title} <span className="by">~{this.props.blogs[1].author}</span> </div>
				                    </div>
				                </div>
				                <div className="larger read-more">
				                    <div className="pic-info">
				                        <div className="title open-condensed">Read More</div>
				                    </div>
				                    <div className="small" style={{"backgroundImage" : `url(${this.props.blogs[2].image})`}}>
				                        <div className="pic-info">
				                            <p className="tag career">{this.props.blogs[2].tags}</p>
				                            <div className="title open-condensed">{this.props.blogs[2].title} <span className="by">~{this.props.blogs[2].author}</span> </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				</section>
			);
		}	else 	{
			return(<p></p>);
		}
	}
};


module.exports = Blogs;