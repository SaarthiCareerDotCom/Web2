var usersCollection = require('../firebase/connectUsers');

var getUserDetails = function(validatedUserId, callback) {
    //  var userDetails={};
    usersCollection.orderByKey().equalTo(validatedUserId).on('value',function(dataSet){
      callback(dataSet.val());
    });
}
module.exports = getUserDetails;
// getUserDetails('1234567');
