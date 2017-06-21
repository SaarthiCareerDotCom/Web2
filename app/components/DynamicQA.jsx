var React = require('react');

var DynamicQA = React.createClass({
  addReply: function (e) {
      e.preventDefault();
      var list = this.state.AnswerList;
      list.push({  "answer": "" });
      this.setState({ AnswerList: list });
  },
submitReply : function(e){
  e.preventDefault();
  var list = this.state.FinalAnswers;
  var obj = this.state.AnswerList[this.state.currentIndex];
  if(obj.answer != '\0'){
  list.push(obj);
}
  this.setState({
    FinalAnswers: list,
    steps : this.state.steps+1
  });
  console.log(this.state.FinalAnswers);
  this.removeQA(this.state.currentIndex);

},
assignIndex: function (index) {
    this.setState({
        currentIndex: index
    });
},
updateAnswer: function (evt) {
    var value = evt.target.value;
    var list = this.state.AnswerList;

    list[this.state.currentIndex] = {  "answer": value };
    this.setState({ AnswerList : list });
},
removeQA: function (index) {
    var list = this.state.AnswerList;
    list.splice(index, 1);
    this.setState({ AnswerList: list });
},
  getInitialState: function () {
      return {
          AnswerList: [],
          currentIndex : 0,
          FinalAnswers : [],
        };
  },

  render : function(){
      var array=  this.state.FinalAnswers;
      var len = array.length;
      var Alist = [];

      for (var i=0; i<len; i++)
      {
        if(array[i].answer)
          Alist.push(<li>{array[i].answer}</li>);
      }
      return(

      <div>
    <div>
      {Alist}
    </div>
    <div className="form-group">
        <div className="col-sm-4">
            {this.state.AnswerList.map(function (input, index) {
               var ref = "input_" + index;
                return (
                    <div className="input-group" key={index} ref="QA" >
                        <input type="text" className="form-control margin-bottom-12px"
                          placeholder={this.props.placeholder0} ref ={ref}
                        onChange={this.updateAnswer} onFocus={this.assignIndex.bind(this, index)}  / >

                            <span className="input-group-addon"  id={ref} >
                                  <button className="success button small"
                                  onClick ={this.submitReply}
                                  type="submit">Submit Reply</button></span>
                    </div>
                )
            }.bind(this)
          )}
            <button className="btn btn-success btn-block success button expanded"
            onClick={this.addReply} type="submit">{this.props.nameButton}</button>
        </div>
    </div>
  </div>
  );

  },
});
module.exports = DynamicQA;
