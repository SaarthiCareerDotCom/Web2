var reqS2S = require('request');

// req.get('http://www.google.com',(err,res,body)=>{
  // console.log('error : ',err);
  // console.log('resCode : ',res && res.statusCode);
  // console.log('body : ',body);
// }) ;
var customReqHeader = {
  'X-Api-Key' : 'aa8ff19fddf6cabc8d923b7d401ba7b6',
  'X-Auth-Token' : '7e40194c2a81ddcd85fdf57382342991'
};
var customReqBody = {
  'amount' : '10',
  'purpose' : 'buyCourse',
  'buyer_name' : 'ajay',
  'email' : 'foo@example.com',
  'phone' : '8892234495',
  'allow_repeated_payments' : false,
  'redirect_url' : 'https://www.google.com'
  // 'expires_at' : ''

};

module.exports =  function(req,res){
    // var redirect_url;
    reqS2S.post('https://test.instamojo.com/api/1.1/payment-requests/',{
      form : customReqBody,headers : customReqHeader},function(error,S2SResponse,resBody){
        // console.log(S2SResponse.statusCode);
        // console.log(resBody);
        if(!error && S2SResponse.statusCode == 201){
          // console.log(JSON.parse(resBody)['payment_request']['longurl']);
          res.redirect(JSON.parse(resBody)['payment_request']['longurl']);
        }
        else
          console.log(error,S2SResponse.statusCode,resBody);
      }
    );
  }


// module.exports = redirect_url;
// var Payment = function(aUser){
//   this.userDetails = {
//     'amount' : aUser.cart,
//     'purpose' : 'buyCourse',
//     'buyer_name' : 'ajay',
//     'email' : 'foo@example.com',
//     'phone' : '1234567890',
//     'allow_repeated_payments' : false
//   }
// }
