var firebase = require('../../common/firebase-config');
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
    enrolledCourseCollection.child(uid).child("courses").once('value',function(data){
        var keys = Object.keys(data.val());
        keys.map(function(val){
            enrolledCourse.push(data.val()[val]["courseId"]);
        });
    }).then(()=>{
        callback(200,enrolledCourse,null);
    }).catch((error)=>{
        callback(400,null,error);
    });
}

var courseNotification = function(enrolledCourse){
    var ref = firebase.database().ref();
        for(var j=0; j < courses.length;j++){
            var  course = ref.child('courses/'+courses[j]);
            course.orderByChild('time').on('value',function(data){
            var key =  Object.keys(data.val());
            for(var i =0; i < key.length; i++)
                console.log(data.val()[key[i]]['message']);
            })
        }      
}



module.exports = {
    "enrollInACourse" : enrollInACourse,
    "enrolledCourses" : enrolledCourses
}