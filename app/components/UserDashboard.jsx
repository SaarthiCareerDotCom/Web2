var React = require('react');

import firebase from '../configuration/firebase-config'
var database = firebase.database();
var Nav_logout = require('Nav_logout');
import { Link } from 'react-router';
var UserDashboard = React.createClass({
  getInitialState: function () {
    return {
    message: "try a coupon",
    steps :1,
    amountToPay : 5000,
    number : 0
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
                console.log(data.info);
              //  console.log(Object.keys(data));
                console.log(data);
                console.log(data.percentage);
              if(data.info == true){
                var timestamp = Date.now();
                console.log(timestamp);
                var date = new Date(timestamp);
                console.log(date);

                _this.setState({
                  number : _this.state.number +1
                });
                if(_this.state.number > 1){
                  _this.setState({
                    amountToPay : 5000
                  });
                }

                _this.setState({
                  message : "coupon verified",
                  steps : 2,
                  amountToPay: _this.state.amountToPay * (100 - data.percentage)/100
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
      var User = firebase.auth().currentUser;
      console.log(User.uid);
        if(User != undefined){
      return(

        <div>
            <Nav_logout />
          <Link to={'/userDetails'}>
            <input type="button" value="User dashboard" />
              </Link>
          <h1>
            welcome { User.email }
          </h1>

          <button type ="button" onClick={this.instamojo}  >
            pay 5000
          </button>

          <form >
          {this.state.message}:<br />

          <input type="text" name="coupon_code" placeholder= "coupon code" ref ="coupon_code" />

          <input  type="button" onClick={this.onFormSubmit} value="Apply" />
          </form>



        </div>

      );
    }

    }
  });
  module.exports= UserDashboard;
