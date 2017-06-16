var usersCollection = require('../firebase/connectUsers');

var getProfile = function(userId, callback) {
    usersCollection.orderByKey().equalTo(userId).on('value',function(dataSet){
      console.log(dataSet.val());
      callback(dataSet.val()[userId]);
    });
}
module.exports = getProfile;
