var reqS2S = require('request');
var ngrok = require('ngrok');
var webhook;
ngrok.connect(3000,function (err, url) {
  webhook = url.toString();
  console.log(webhook);
});
// req.get('http://www.google.com',(err,res,body)=>{
  // console.log('error : ',err);
  // console.log('resCode : ',res && res.statusCode);
  // console.log('body : ',body);
// }) ;
var customReqHeader = {
  'X-Api-Key' : 'aa8ff19fddf6cabc8d923b7d401ba7b6',
  'X-Auth-Token' : '7e40194c2a81ddcd85fdf57382342991'
};


var paymentRequest = function(validatedUser,callback){
  var id = validatedUser.id;
  var name = validatedUser.username;
  var amount = validatedUser.amount;
  var purpose = validatedUser.purpose;
  var email = validatedUser.email;
  var phone = validatedUser.phone;
  var customReqBody = {
    'amount' : amount,
    'purpose' : purpose,
    'buyer_name' : name,
    'email' : email,
    'phone' : phone,
    'allow_repeated_payments' : false,
    'redirect_url' : 'http://localhost:3000/',
    'webhook' : webhook + '/api/paymentSuccessful/'+ id
    // 'expires_at' : ''
  };
  reqS2S.post('https://test.instamojo.com/api/1.1/payment-requests/',{
        form : customReqBody,headers : customReqHeader},function(error,S2SResponse,resBody){
          if(!error && S2SResponse.statusCode == 201){
            console.log(JSON.parse(resBody));
            callback(true,JSON.parse(resBody)['payment_request']['longurl'],null);
          }
          else
            console.log(error,S2SResponse.statusCode,resBody);
            callback(false,null,error);
        }
      );
};
module.exports = paymentRequest;
