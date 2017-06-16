var usersCollection = require('../firebase/connectUsers');

var register_A_user = function(aUser,callback){
  var aUserId = aUser.id.toString();
  usersCollection.child(aUserId).set({
    username : aUser.username,
    email : aUser.email,
  },function (error) {
    if(error)callback(false,null,error);
    else callback(true,aUser,null);
  });

}

module.exports = register_A_user;
