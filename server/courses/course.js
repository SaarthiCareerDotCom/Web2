var firebase = require('../../common/firebase-config');
var allCourseCollection = firebase.database().ref('allcourse');

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
        callback(200,courseDetail ? courseDetail : {message : "course NOT found"} ,null);
    }).catch((error)=>{
        callback(400,null,error)
    });
}

module.exports = {
    "getAllCourseId" : getAllCourseId,
    "getACourseDetail" : getACourseDetail
}