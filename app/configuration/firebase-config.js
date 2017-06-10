var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyA93riPKRmRemS6pM9nk7G5zQnMyfHT-1Q",
  authDomain: "auth-62369.firebaseapp.com",
  databaseURL: "https://auth-62369.firebaseio.com",
  projectId: "auth-62369",
  storageBucket: "auth-62369.appspot.com",
  messagingSenderId: "85060733264e"                                        
};

firebase.initializeApp(config);

module.exports = firebase;