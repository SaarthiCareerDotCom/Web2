import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';

var Promotion = React.createClass({
	render: function(){
		var settings = {
		   	infinite: true,
			dots: true,
   			arrows: false
		}
	return(
		<section className="promotion">
	    <div className="row">
	        <div className="section-title">Promotion <span className="closeIcon"></span></div>
	        <Slider {...settings} className="column large-12 ad-container">
	            <div className="ad" style={{"backgroundImage" : "url('images/promotion.jpg')"}}>
	                <div className="adText">
	                    <p className="title open-condensed">New Course available</p>
	                    <p className="text">Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows</p>
	                </div>
	            </div>
	            <div className="ad" style={{"backgroundImage" : "url('images/ad2.jpg')"}}>
	                <div className="adText">
	                    <p className="title open-condensed">New Course available</p>
	                    <p className="text">Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows</p>
	                </div>
	            </div>
	        </Slider>
	    </div>
		</section>
	);
	}
});


module.exports = Promotion