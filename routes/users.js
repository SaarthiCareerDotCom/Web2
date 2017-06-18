var express = require('express');
var router = express.Router();
var request = require('request');
var register_A_user = require('./register');
//var getUserDetails = require('./signin');
var   usersCollection = require('../firebase/connectUsers');
 var openurl = require("openurl");
var firebase = require('firebase');


var getUserDetails = function(validatedUserId,callback)
{
  usersCollection.orderByKey().equalTo(validatedUserId).on('value',function(dataSet){
    callback(dataSet.val()[validatedUserId]);
  });
};

var getCouponDetails = function(coupon_code,callback){
  var info,percentage,quantity;
  var ref = firebase.database().ref("saarthi/coupons");
  ref.orderByChild("code").equalTo(coupon_code).on("value", function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();

    if(data != undefined ){
      var key = Object.keys(data);
       percentage = data[key]["percentage"];
       quantity = data[key]["quantity"];
       if( quantity > 0){

        info = true;
        console.log('coupon verified');
          callback(info,percentage);
}else{
  percentage = '0';
  info = false;
  callback(info,percentage);
}
      }
      else   {
        percentage = '0';
      info = false;
      console.log('invalid coupon');
        callback(info,percentage);

    }



  });

    //  var data = snapshot.val();
    //  console.log(data);
//     for (var key in data) {
//       if (data[key] == coupon_code) {
//       info = true;
//       callback(info);
//       console.log(info);
//       return;
//       }
//       else{
//       info = false;
//         console.log(info);
//     }
//   }
// callback(info);
//});
};
/* GET users listing. */
router.post('/register', function(req, res, next) {
  console.log(req.body);
  register_A_user(req.body);
  res.send(req.body);
});

// check for coupons
router.post('/coupon', function(req, res, next) {
var coupon_code = req.body.cc;
console.log(coupon_code);
getCouponDetails(coupon_code,function(info,percentage){
console.log(info,percentage);
var a ={
  'info' : info,
  'percentage' : percentage
}
console.log(a);
res.send(JSON.stringify(a));

});

});

router.post('/signin',function(req, res, next) {
  var validatedUserId = req.body.ID;
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
      res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
});
router.post('/user_details',function(req, res, next) {

  var validatedUserId = req.body.id;
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
        // console.log(userDetails);
      res.send(userDetails);

  }else{
      res.send('ID is NOT specified.');
    }
  });
});



router.post('/payment',function(req,res){

var username,email;
var headers = { 'X-Api-Key': 'aa8ff19fddf6cabc8d923b7d401ba7b6', 'X-Auth-Token': '7e40194c2a81ddcd85fdf57382342991'};
console.log(req.body);
var validatedUserId = req.body.id;
getUserDetails(validatedUserId,function(details){
  console.log('first');
  console.log(details);
 username =details.username;
  email = details.email;
console.log(username,email);

var payload = {
  purpose: req.body.purpose,
  amount: req.body.amount,
  phone: '9916804203',
  buyer_name: username,
  redirect_url:'http://localhost:3000/users/paymentSuccessful',
  send_email: false,
  webhook: 'http://192.168.0.107:3000/users/webhook',
  send_sms: false,
  email: email,
  allow_repeated_payments: false};
  request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){

      console.log(body);
      var data = JSON.parse(body);

      console.log(error);

  //  console.log( data ) ;
  //console.log(data["payment_request"]["longurl"]);
   x = data["payment_request"]["longurl"];
  //request.get(x,function(err,res,body){
  //  console.log(body);
  console.log(JSON.stringify(x));
  openurl.open(x);
  //res.redirect(x);
  });


});


console.log(payload);



});


router.get('/paymentSuccessful',function (req,res,next) {
  res.send('<h1>done</h1>');
});
router.post('/webhook',function (req,res,next) {
  console.log(res.body);
console.log('123');
//res.end(req.body);
});
var updateProfile = function(uid,dataToBeUpdatedObj,callback){
  usersCollection.child(uid).update({
    username :dataToBeUpdatedObj.username,
    college : dataToBeUpdatedObj.college,
    branch: dataToBeUpdatedObj.branch,
    contactno : dataToBeUpdatedObj.contactno
  });
  callback(true);
};
router.post('/updateProfile',function(req,res,next){
  var uid = req.body.id;
  console.log(req.body);
  updateProfile(uid,req.body,(status)=>{
    if(status)
    res.send({message :"profile update successfully"});
    else {
      res.send({message : "some error"});
    }
  }
);
});
module.exports = router;
