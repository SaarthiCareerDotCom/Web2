var usersCollection = require('../firebase/connectUsers');

var register_A_user = function(aUser){
  var aUserId = aUser.id.toString();
  usersCollection.child(aUserId).set({
    username : aUser.username,
    email : aUser.email
  });
    // console.log(data);
  //   if(err)
  //     console.log(err);
  //   else
  //     console.log('user inserted succesfully');
  // });
}

module.exports = register_A_user;
