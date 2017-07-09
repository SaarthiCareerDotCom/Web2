import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';

export default class Promotion extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var settings = {
		   	infinite: true,
			dots: true,
   			arrows: false
		}
	if(this.props.slides.length > 0) {
		return(
		<section className="promotion">
	    <div className="row">
	        <div className="section-title">Promotion <span className="closeIcon"></span></div>

	        <Slider {...settings} className="column large-12 ad-container">
	        	{this.props.slides.map((slide,i) => {
	        		return (
						<div key={i} className="ad" style={{"backgroundImage" : `url(${slide.image})`}}>
			                <div className="adText">
			                    <p className="title open-condensed">{slide.title}</p>
			                    <p className="text">{slide.text}</p>
			                </div>
			            </div>
	        			)
	        	})}
	        </Slider>
	    </div>
		</section>
		);
	}	else 	{
		return (<p>loading</p>);
	}
	
	}
};


module.exports = Promotion