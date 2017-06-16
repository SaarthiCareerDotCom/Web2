var express = require('express');
var router = express.Router();
var request = require('request');
var register_A_user = require('./register');
var getProfile = require('./getProfile');
var paymentRequest = require('./payment/paymentRequest');
var saveUserPaymentDetails = require('./saveUserPaymentDetails');
var openurl = require("openurl");
var updateProfile = require('./updateProfile');

/* GET users listing. */
router.post('/register', function(req, res, next) {
  console.log(req.body);
  register_A_user(req.body,(status,aUser,error) => {
    if(status)res.send({message : "user created successfully"});
    else res.send(error);
    });
});

router.post('/updateProfile',function (req,res,next) {
  var uid = req.body.id;
    updateProfile(uid,req.body,(status,updatedProfile,error) => {
      if(status)res.send({message : "profile updated successfully"});
      else res.send(error);
      });
});

router.post('/profile',function(req, res, next) {
  var userId = req.body.id;
  console.log(req.body.id);
  getProfile(userId,(userDetails) => {
    if(userDetails){
      res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
});

router.post('/payment',function(req,res,next){
  var validatedUser = req.body;
  var validatedUserId = req.body.id;
      paymentRequest(validatedUser,function (status,paymentUri,error) {
        if(status){
          openurl.open(paymentUri);
        }
        else res.send(error);
      });
});

router.post('/paymentSuccessful/:id',function (req,res,next) {
  console.log(req.body);
  console.log(req.params);
  var paymentDetails = req.body;
  saveUserPaymentDetails(req.params.id,paymentDetails);
  res.end();
});

module.exports = router;
