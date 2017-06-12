var express = require('express');
var router = express.Router();

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
  var validatedUserId = req.body.ID;
  getUserDetails(validatedUserId,(userDetails) => {
    if(userDetails){
      res.send(userDetails);
    }else{
      res.send('ID is NOT specified.');
    }
  });
});


router.post('/payment',function(req,res,next){
  var validatedUser = req.body;
      paymentRequest(validatedUser,function (redirect_url) {
        res.redirect(redirect_url);
      });
});

router.get('/paymentSuccesful',function (req,res,next) {
  res.send("payment succesfull.");
});

module.exports = router;
