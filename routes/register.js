var usersCollection = require('../firebase/connectUsers');

var register_A_user = function(aUser){
  var aUserId = aUser.ID.toString();
  usersCollection.child(aUserId).set({
    name : aUser.name,
    age : aUser.age
  });
    // console.log(data);
  //   if(err)
  //     console.log(err);
  //   else
  //     console.log('user inserted succesfully');
  // });
}

module.exports = register_A_user;
