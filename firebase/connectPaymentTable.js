var firebase = require('firebase');
var config = require('./firebaseConfig');
// console.log(config);
module.exports = firebase.database().ref('saarthi').child('payments');
