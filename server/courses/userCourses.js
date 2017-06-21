var firebase = require('../../common/firebase-config');
var course = require('./course');
var enrolledCourseCollection = firebase.database().ref('saarthi').child('enrolled');

var enrollInACourse = function(uid,courseId,callback){
    enrolledCourseCollection.child(uid).child('courses').push().update({
        courseId : courseId
    }).then(()=>{
        callback(200,courseId,null);
    }).catch((error)=>{
        callback(400,null,error);
    });
}

var enrolledCourses = function(uid,callback){
    var enrolledCourse = [];
    var nonEnrolledCourse = [];
    enrolledCourseCollection.child(uid).child("courses").once('value',function(data){
        if(data.val()){
          var keys = Object.keys(data.val());
          keys.map(function(val){
            enrolledCourse.push(data.val()[val]["courseId"]);
          });
        }
    }).then(()=>{
        course.getAllCourseId((status,allCourseId,error)=>{
          if(status==200){
            nonEnrolledCourse = allCourseId.filter((courseId)=>{
              return enrolledCourse.indexOf(courseId) == -1;
            });
            callback(200,{"enrolledCourse" : enrolledCourse,"nonEnrolledCourse" : nonEnrolledCourse},null);
          }
          else callback(400,null,error);
        });
    }).catch((error)=>{
        callback(400,null,error);
    });
}


module.exports = {
    "enrollInACourse" : enrollInACourse,
    "enrolledCourses" : enrolledCourses
}
