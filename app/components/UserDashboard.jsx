import React from 'react';
import firebase from '../../common/firebase-config';
import commonContants from '../../common/constants';
import commonAPI from '../../common/server-api';

var UserDashboard = React.createClass({
    onPaymentRequest: function(){
        var amount = 100;
        var host = commonContants.HOST + ":" + commonContants.PORT;
        var paymentUri = host + commonAPI.paymentAPI;
        var purpose = 'course buy';

        var header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var body = {
            'id' : this.user.uid,
            'email': this.userDetails.email,
            'username': this.userDetails.username,
            'amount': amount,
            'purpose': purpose,
            'phone': this.userDetails.phone
        };

        fetch(paymentUri, {method: 'POST', headers: header, body: JSON.stringify(body)})
            .then((response)=>{
                console.log("payment success");
            }).catch((error)=>{
                console.log(error);
            });
    },
    render: function () {
        var userId = firebase.auth().currentUser;
        return (
            <div>
                <div>welcom {userId.email}</div>
                <input type="button" onClick={this.onPaymentRequest} value="PAY"/>
            </div>
        );
    }
});

module.exports = UserDashboard;
