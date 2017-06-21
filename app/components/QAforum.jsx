var React = require('react');
var {Link, IndexLink} = require('react-router');
var DynamicQA=require('DynamicQA');
var QAforum = React.createClass({


render :function(){
  var Qlist=[];
    Qlist.push(<ul>Q1: why do we need data sturctures??</ul>);
    Qlist.push(<ul>Q2: why do we need algorithms ??</ul>);
    Qlist.push(<ul>Q3: why do we need debugging skills??</ul>);
return (
    <div>
    { Qlist.map(function(input,index){
        return(
      <div className="row">
          <div className="columns medium-6 large-4 small-centered">
            <div>
              <h5>{Qlist[index]}</h5>
            </div>

              <DynamicQA placeholder0="Answers" nameButton="Reply" ref="Reply"/>

          </div>
      </div>
    )
  }.bind(this)
)}
</div>
  );


}

});


module.exports = QAforum;
