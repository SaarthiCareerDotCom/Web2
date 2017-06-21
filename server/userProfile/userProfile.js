var firebase = require('../../common/firebase-config');
var message = require('../constants/message');
var usersCollection = firebase.database().ref('saarthi').child('users');

var getProfile = function(userId, callback) {
    usersCollection.orderByKey().equalTo(userId).once('value',function(dataSet){
      var details = dataSet.val();
      callback(200,details ? details : {message : message.profileError}, null);
    }).catch((error) => {
      callback(400,null,error);
    });
}

var updateProfile = function (uid,dataToBeUpdatedObj,callback) {
  usersCollection.child(uid).update({
    username : dataToBeUpdatedObj.username,
    phone : dataToBeUpdatedObj.phone,
    college : dataToBeUpdatedObj.college,
    yearOfpassing : dataToBeUpdatedObj.yearOfpassing,
    branch : dataToBeUpdatedObj.branch
  }).then(()=>{
      callback(200,dataToBeUpdatedObj,null);
  }).catch((error)=>{
      callback(400,null,error);
  });

}

var register_A_user = function(aUser,callback){
  var aUserId = aUser.id.toString();
  usersCollection.child(aUserId).set({
    username : aUser.username,
    email : aUser.email,
  }).then(()=>{
      callback(200,aUser,null);
  }).catch((error)=>{
      callback(400,null,error);
  });

}

module.exports = {
  "getProfile" : getProfile,
  "updateProfile" : updateProfile,
  "register_A_user" : register_A_user
}
