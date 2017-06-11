var express = require('express');
var router = express.Router();

var register_A_user = require('./register');
var getUserDetails = require('./signin');
var paymentRequest = require('./payment/paymentRequest');

/* GET users listing. */
router.post('/register', function(req, res, next) {
  register_A_user(req.body);
  res.send(req.body);
});

router.post('/signin',function(req, res, next) {
  var validatedUserId = req.body.ID;
  // res.send(req.body);
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
      res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
  // console.log(userDetails);
});


router.post('/payment',function(req,res,next){
  var validatedUserId = req.body.ID;
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
      console.log("foo");
      // res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
});

module.exports = router;
