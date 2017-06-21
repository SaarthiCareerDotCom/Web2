var express = require('express');
var router = express.Router();
var openurl = require('openurl');
var serverAPI = require('../../common/server-api');
var userPayment = require('../userPayment/userPayment');
var userProfile = require('../userProfile/userProfile');
var coupons = require('../coupons/coupons');
var userCourses = require('../courses/userCourses');
var course = require('../courses/course');
var message = require('../constants/message');

/* api handlers. */
router.post(serverAPI.registerAPI, function(req, res, next) {
  userProfile.register_A_user(req.body,(status,aUser,error) => {
    if(status == 200)res.status(status).send({message : message.registerUser});
    else res.status(status).send(error.message);
    });
});

router.post(serverAPI.updateProfileAPI,function (req,res,next) {
  var uid = req.body.id;
    userProfile.updateProfile(uid,req.body,(status,updatedProfile,error) => {
      if(status == 200)res.status(status).send({message : message.updateProfile});
      else res.status(status).send(error.message);
      });
});

router.post(serverAPI.profileAPI,function(req, res, next) {
  var userId = req.body.id;
  userProfile.getProfile(userId,(status,userDetails,error) => {
    (status == 200) ? res.status(200).send(userDetails) : res.status(400).send(error.message);
  });
});

router.post(serverAPI.paymentAPI,function(req,res,next){
  var uid = req.body.id;
  var priceDetails = req.body;
  userProfile.getProfile(uid,(status,userDetails,error) => {
    if(status == 200 && userDetails.email != undefined){
      userPayment.paymentRequest(uid,userDetails,priceDetails,function (payStatus,paymentUri,payError) {
        if(payStatus == 200){
          openurl.open(paymentUri);
          res.end();
        }
        else res.status(payStatus).send(payError.message);
      });
    }
    else if (status == 200 && userDetails.email == undefined){
      res.status(200).send(userDetails);
    }else{
      res.status(400).send(error.message);
    }
  });

});

router.post(serverAPI.paymentSuccessfulAPI + '/:uid/:couponUsed',function (req,res,next) {
  var uid = req.params.uid;
  var paymentDetails = req.body;
  var couponUsed = req.params.couponUsed;
  userPayment.savePaymentDetails(paymentDetails);
  userPayment.savePaymentID(uid,couponUsed,paymentDetails);
  coupons.updateCouponQuantity(couponUsed);
  res.end();
});

// check for coupons
router.post(serverAPI.verifyCouponAPI, function(req, res, next) {
  var couponCode = req.body.couponCode;
  console.log(couponCode);
  coupons.getCouponDetails(couponCode,function(status,percentage,error){
    console.log(status,percentage);
    res.status(status).send(JSON.stringify({
      'percentage' : percentage,
      'message' : error.message
    }));
  });
});

router.post(serverAPI.enrollInACourseAPI,function(req,res,next){
  var uid = req.body.id;
  var courseId = req.body.courseId;
  userCourses.enrollInACourse(uid,courseId,(status,courseId,error)=>{
    if(status == 200)res.status(status).send({message : message.enroll});
    else res.status(status).send(error.message);
  });
});

router.post(serverAPI.enrolledCoursesAPI,function(req,res,next){
  var uid = req.body.id;
  userCourses.enrolledCourses(uid,(status,enrolledCourses,error)=>{
    if(status == 200)res.status(status).send(JSON.stringify(enrolledCourses));
    else res.status(status).send(error.message);
  });
});

// router.get(serverAPI.getAllCourseIdAPI,function(req,res,next){
//   course.getAllCourseId((status,allCourseId,error)=>{
//     if(status == 200)res.status(status).send(JSON.stringify(allCourseId));
//     else res.status(status).send(error.message);
//   });
// });

router.post(serverAPI.courseDetailAPI,function(req,res,next){
  var courseId = req.body.courseId;
  course.getACourseDetail(courseId,(status,courseDetail,error)=>{
    if(status == 200)res.status(status).send(courseDetail);
    else res.status(status).send(error.message);
  });
});

router.post(serverAPI.courseNotification,function (req,res,next) {
  var uid = req.body.id;
  userCourses.enrolledCourses(uid,(status,enrolledCourses,error)=>{
    if(status == 200) {
      course.getCourseNotification(enrolledCourses);
    } else {
      res.status(status).send(error.message);
    }
  });
})
module.exports = router;
