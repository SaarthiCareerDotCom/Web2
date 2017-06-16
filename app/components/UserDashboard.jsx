var React = require('react');

import firebase from '../configuration/firebase-config'
var database = firebase.database();

// var data = coupon_db.child("coupons");
// console.log(data);

var UserDashboard = React.createClass({
  getInitialState: function () {
    return {
    message: "try a coupon",
    steps :1,
    amountToPay : 5000
    }
  },

  instamojo : function(){

var uid = firebase.auth().currentUser.uid;
    fetch('http://localhost:3000/users/payment',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        purpose: 'data-structure course',
        amount: this.state.amountToPay,
        id :uid

      })
    }).catch((error) => {
      console.log(error);
    });

    },
    onFormSubmit : function()
    {
      var _this = this;
          var coupon_code = this.refs.coupon_code.value;
          console.log(coupon_code);

          fetch('http://localhost:3000/users/coupon',{

            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
            body: JSON.stringify({
              cc: coupon_code


            })
          }).then(function(res){

              return res.json();
            }).then(function(data){
                    console.log(data);
              if(data == true){

                _this.setState({
                  message : "coupon verified",
                  steps : 2,
                  amountToPay: _this.state.amountToPay * 0.75
                });
              }
              else{
                _this.setState({
                  message : "invalid coupon"
                });
              }
            })
          .catch(function(error){
            console.log(error);
          });



    },
    render:function()
    {
      var User_uid = firebase.auth().currentUser;
      console.log(User_uid.uid);
      return(

        <div>

          <h1>
            welcome { User_uid.email }
          </h1>

          <button type ="button" onClick={this.instamojo}  >
            pay 500
          </button>

          <form >
          {this.state.message}:<br />

          <input type="text" name="coupon_code" placeholder= "coupon code" ref ="coupon_code" />

          <input  type="button" onClick={this.onFormSubmit} value="Apply" />
          </form>



        </div>

      );
    }
  });
  module.exports= UserDashboard;
