import React from "react";

export default class Svg extends React.Component {
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