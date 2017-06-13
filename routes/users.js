var express = require('express');
var router = express.Router();

var register_A_user = require('./register');
var getUserDetails = require('./signin');
var paymentRequest = require('./payment/paymentRequest');
var usersCollection = require('../firebase/connectUsers');

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
  var validatedUserId = req.body.id;
      paymentRequest(validatedUser,function (payResBody) {
        usersCollection.child(validatedUserId).update({
          'paymentRequest' : payResBody['payment_request']
        });
        console.log(JSON.stringify(payResBody['payment_request']['longurl']));
        // res.send(JSON.stringify(payResBody['payment_request']['longurl']));
        res.redirect(JSON.parse(resBody)['payment_request']['longurl']);
      });
});

router.post('/:id/paymentSuccesful',function (req,res,next) {
  console.log(req.body);
  res.send("payment succesfull.");
});

module.exports = router;
