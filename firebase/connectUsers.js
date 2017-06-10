var firebase = require('firebase');
var config = require('./firebaseConfig');
// console.log(config);
firebase.initializeApp(config);

module.exports = firebase.database().ref('saarthi').child('users');
// var database = ;
// var collection = database //here we are storing in detail
//
// var nameRef = namesRef.push();
//
//
// //console.log(namesRef.push().key);
// console.log(nameRef.key); //actual key that is in database
//
// nameRef.update({
//   name: 'xyyyyy',
//   email: 'yy'
//   paaword:
// });
// // //to delete the detail node
// // ref.update({
// //     detail: null
// // });
//
// ref.once('value')
//   .then(function(snap){
//       console.log(snap.key,"\n\n");
//       console.log(snap.ref.toString(),"\n\n");
//       console.log(snap.val(),"\n\n");
//   });
