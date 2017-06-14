var usersCollection = require('../firebase/connectUsers');

var getUserDetails = function(validatedUserId, callback) {
    //  var userDetails={};
    usersCollection.orderByKey().equalTo(validatedUserId).on('value',function(dataSet){
      console.log(dataSet.val());
      // console.log();
      callback(dataSet.val()[validatedUserId]);
    });
}
module.exports = getUserDetails;
// getUserDetails('1234567');
