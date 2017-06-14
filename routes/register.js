var usersCollection = require('../firebase/connectUsers');

var register_A_user = function(aUser){
  var aUserId = aUser.id.toString();
  console.log(aUser);
  usersCollection.child(aUserId).set({
    username : aUser.username,
    email : aUser.email
  });

}

module.exports = register_A_user;
