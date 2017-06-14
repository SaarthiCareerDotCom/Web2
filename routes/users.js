var express = require('express');
var router = express.Router();
var request = require('request');
var register_A_user = require('./register');
var getUserDetails = require('./signin');
var paymentRequest = require('./payment/paymentRequest');

/* GET users listing. */
router.post('/register', function(req, res, next) {
  console.log(req.body);
  register_A_user(req.body);
  res.send(req.body);
});

router.post('/signin',function(req, res, next) {
  var validatedUserId = req.body.id;
  console.log(req.body.id);
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
      res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
});


// <<<<<<< HEAD
router.post('/payment',function(req,res,next){
  var validatedUser = req.body;
  var validatedUserId = req.body.id;
      paymentRequest(validatedUser,function (payResBody) {
        // usersCollection.child(validatedUserId).update({
        //   'paymentRequest' : payResBody['payment_request']
        // });
        // console.log(JSON.stringify(payResBody['payment_request']['longurl']));
        // res.send(JSON.stringify(payResBody['payment_request']['longurl']));
        res.redirect(payResBody);
      });
});

router.post('/:id/paymentSuccesful',function (req,res,next) {
  console.log(req.body);
  res.send("payment succesfull.");
});
// =======
// router.post('/payment',function(req,res){
//
//
// var headers = { 'X-Api-Key': 'aa8ff19fddf6cabc8d923b7d401ba7b6', 'X-Auth-Token': '7e40194c2a81ddcd85fdf57382342991'};
// var payload = {
//   purpose: 'FIFA 16',
//   amount: '1001',
//   phone: '9916804203',
//   buyer_name: 'godzilla',
//   redirect_url: 'http://localhost:3000/users/paymentSuccessful',
//   send_email: true,
//   webhook: 'http://192.168.0.107:3000/users/webhook',
//   send_sms: true,
//   email: 'anuragbabel11@gmail.com',
//   allow_repeated_payments: false};
//
//
//
// request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
//
//     console.log(body);
//     var data = JSON.parse(body);
//
//     console.log(error);
//
// //  console.log( data ) ;
// //console.log(data["payment_request"]["longurl"]);
//  x = data["payment_request"]["longurl"];
// //request.get(x,function(err,res,body){
// //  console.log(body);
// res.redirect(x);
// });
//
//
// >>>>>>> c115fab2b3625ef2a37ef312de10688c63a3dcb4
// });


router.get('/paymentSuccessful',function (req,res,next) {
  res.send('<h1>done</h1>');
});
router.get('/webhook',function (req,res,next) {
console.log('123');
res.end(req.body);
});
module.exports = router;
