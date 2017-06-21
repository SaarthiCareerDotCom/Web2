var firebase = require('../../common/firebase-config');
var message = require('../constants/message');
var allCourseCollection = firebase.database().ref('allcourse');
var courseNotificationCollection = firebase.database().ref('admin/notifications');

var getAllCourseId = function(callback){
    var allCourseId = [];
    allCourseCollection.once('value',function(data){
        allCourseId = Object.keys(data.val());
    }).then(()=>{
        callback(200,allCourseId,null);
    }).catch((error)=>{
        callback(400,null,error);
    });
}

var getACourseDetail = function(courseId,callback){
    allCourseCollection.child(courseId).once('value',function(courseDetail){
        var courseDetail = courseDetail.val();
        callback(200,courseDetail ? courseDetail : {message : message.courseError} ,null);
    }).catch((error)=>{
        callback(400,null,error)
    });
}

var courseWiseMesseges = function(enrolledCourse,callback){
  console.log(enrolledCourse);
    var notification = {};
    var count = 0;

    enrolledCourse.map((courseId)=>{
      count++;
      courseMessages(courseId,(messages)=>{
        notification[courseId] = messages;
        if(count == enrolledCourse.length)
        console.log(notification);
      });
    });

    callback(notification);
}
    // callback(notification);
    // if(notification != undefined)resolve(notification);
    // else reject("errrrrrrr");

  // });

  // promise.then((notification)=>{
    // console.log(notification);
  // },(err)=>{
    // console.log(err);
  // })

        // for(var j=0; j < enrolledCourse.length;j++){
        //     courseNotificationCollection.child(enrolledCourse[j]).once('value',function(data){
        //     var key =  Object.keys(data.val());
        //     for(var i =0; i < key.length; i++)
        //         console.log(data.val()[key[i]]['message']);
        //     })
        // }
// }
var courseNotification = function(enrolledCourse){
  courseWiseMesseges(enrolledCourse,(notification)=>{
    console.log("-----------------------");
    console.log(notification);
    console.log("-----------------------");

  });
}

var courseMessages = function(courseId,callback){
  var messages  = [];
  courseNotificationCollection.child(courseId).once('value',function(data){
  var key =  Object.keys(data.val());
  for(var i =0; i < key.length; i++)
      messages.push(data.val()[key[i]]['message']);
  }).then(()=>{
    callback(messages);
  }).catch((err)=>{
    console.log(err);
  });

}

module.exports = {
    "getAllCourseId" : getAllCourseId,
    "getACourseDetail" : getACourseDetail,
    "getCourseNotification" : courseNotification
}
