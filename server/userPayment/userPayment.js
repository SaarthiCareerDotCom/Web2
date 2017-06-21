var reqS2S = require('request');
var ngrok = require('ngrok');
var firebase = require('../../common/firebase-config');
var constants = require('../constants/constants');
var serverAPI = require('../../common/server-api');
var paymentsCollection = firebase.database().ref('saarthi').child('payments');
var usersCollection = firebase.database().ref('saarthi').child('users');
var webhook;
ngrok.connect(constants.PORT,function (err, url) {
  // console.log(err,url);
});

var savePaymentID = function(uid,couponUsed,aPaymentDetail){
    usersCollection.child(uid).child("paymentId").push().set({
    payId : aPaymentDetail.payment_id,
    couponUsed : couponUsed
  });
}

var savePaymentDetails = function(aPaymentDetail){
  paymentsCollection.child(aPaymentDetail.payment_id).set(aPaymentDetail);
}

var customReqHeader = {
  'X-Api-Key' : constants.PAYMENT_API_KEY,
  'X-Auth-Token' : constants.PAYMENT_AUTH_TOKEN
};


var paymentRequest = function(uid,userDetails,priceDetails,callback){
  var name = userDetails.username;
  var email = userDetails.email;
  var phone = userDetails.phone;
  var amount = priceDetails.amount;
  var purpose = priceDetails.purpose;
  var couponUsed = priceDetails.couponUsed;
  var customReqBody = {
    'amount' : amount,
    'purpose' : purpose,
    'buyer_name' : name,
    'email' : email,
    'phone' : phone,
    'allow_repeated_payments' : false,
    'redirect_url' : constants.PAYMENT_REDIRECT_URL,
    'webhook' : webhook + serverAPI.paymentSuccessfulAPI + '/' + uid + '/' + couponUsed
    // 'expires_at' : ''
  };
  reqS2S.post(constants.INSTAMOJO_URL,{
        form : customReqBody,headers : customReqHeader},function(error,S2SResponse,resBody){
          if(!error && S2SResponse.statusCode == 201){
            console.log(JSON.parse(resBody));
            callback(200,JSON.parse(resBody)['payment_request']['longurl'],null);
          }
          else{
            console.log(error,S2SResponse.statusCode,resBody);
            callback(400,null,error);
          }
        }
      );
};
module.exports = {
  "savePaymentDetails" : savePaymentDetails,
  "paymentRequest" : paymentRequest,
  "savePaymentID" : savePaymentID
};
