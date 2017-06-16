var usersCollection = require('../firebase/connectUsers');

var updateProfile = function (uid,dataToBeUpdatedObj,callback) {
  usersCollection.child(uid).update({
    username : dataToBeUpdatedObj.username,
    phone : dataToBeUpdatedObj.phone,
    college : dataToBeUpdatedObj.college,
    yearOfpassing : dataToBeUpdatedObj.yearOfpassing,
    branch : dataToBeUpdatedObj.branch
  },function (error) {
    if(error)callback(false,null,error);
    else callback(true,dataToBeUpdatedObj,null);
  });

}
module.exports = updateProfile;
