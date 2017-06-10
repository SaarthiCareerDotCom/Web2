var usersCollection = require('../firebase/connectUsers');

var register_A_user = function(aUser){
  usersCollection.push(aUser,function(err){
    // console.log(data);
    console.log(err);
  });
}

module.exports = register_A_user;
