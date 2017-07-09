import React from 'react';
import { Link } from 'react-router';

export default class Blogs extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		if(this.props.blogs.length > 0) {
			return(
						<section className="blogs">
				    <div className="row">
				        <p className="section-title">{this.props.blogs[0].title}</p>
				        <div className="column large-12 block-container">
				            <div className="largest" style={{"backgroundImage" : `url(${{this.props.blogs[0].image}})`}}>
				                <div className="pic-info">
				                    <p className="tag career">{this.props.blogs[0].tags}</p>
				                    <div className="title open-condensed">Renewable energy promises new Jobs <span className="by">~Aquib Khan</span> </div>
				                </div>
				            </div>
				            <div className="largest">
				                <div className="larger time" style={{"backgroundImage" : "url('images/time.jpg')"}}>
				                    <div className="pic-info">
				                        <p className="tag career">CAREER</p>
				                        <div className="title open-condensed">Renewable energy promises new Jobs <span className="by">~Aquib Khan</span> </div>
				                    </div>
				                </div>
				                <div className="larger read-more">
				                    <div className="pic-info">
				                        <div className="title open-condensed">Read More</div>
				                    </div>
				                    <div className="small" style={{"backgroundImage" : "url('images/book.jpg')"}}>
				                        <div className="pic-info">
				                            <p className="tag career">CAREER</p>
				                            <div className="title open-condensed">Renewable energy promises new Jobs <span className="by">~Aquib Khan</span> </div>
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