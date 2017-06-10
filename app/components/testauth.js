var firebase = require('firebase');
//var login = require('LogInForm');

var config = {
  apiKey: "AIzaSyA93riPKRmRemS6pM9nk7G5zQnMyfHT-1Q",
  authDomain: "auth-62369.firebaseapp.com",
  databaseURL: "https://auth-62369.firebaseio.com",
  projectId: "auth-62369",
  storageBucket: "auth-62369.appspot.com",
  messagingSenderId: "85060733264e"                                        
};
firebase.initializeApp(config);
// firebase.database().ref('saarthi').child('users').push({
//   name : 'anushil',
//   email: 'anushil@gmial.in'
// });

/**
     * Handles the sign in button press.
     */
// var signin = function toggleSignIn(email, password) {
//       if (firebase.auth().currentUser) {
//         // [START signout]
//         firebase.auth().signOut();
//         // [END signout]
//       } else {
//         var email = document.getElementById('email').value;
//         var password = document.getElementById('password').value;
//         if (email.length < 4) {
//           alert('Please enter an email address.');
//           return;
//         }
//         if (password.length < 4) {
//           alert('Please enter a password.');
//           return;
//         }
       
//         // Sign in with email and pass.
//         // [START authwithemail]
//         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // [START_EXCLUDE]
//           if (errorCode === 'auth/wrong-password') {
//             alert('Wrong password.');
//           } else {
//             alert(errorMessage);
//           }
//           console.log(error);
//           document.getElementById('quickstart-sign-in').disabled = false;
//           // [END_EXCLUDE]
//         });
//         // [END authwithemail]
//       }
//       document.getElementById('quickstart-sign-in').disabled = true;
//     }

 /**
     * Handles the sign up button press.
     */
var signup = function handleSignUp(email, password) {
      //var email = document.getElementById('email').value;
      //var password = document.getElementById('password').value;
      // if (email.length < 4) {
      //   alert('Please enter an email address.');
      //   return;
      // }
      // if (password.length < 4) {
      //   alert('Please enter a password.');
      //   return;
      // }
      // // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
//signup('anushil@','ianushil@5');   

//    /**
//      * Sends an email verification to the user.
//      */
// export function sendEmailVerification() {
//       // [START sendemailverification]
//       firebase.auth().currentUser.sendEmailVerification().then(function() {
//         // Email Verification sent!
//         // [START_EXCLUDE]
//         alert('Email Verification Sent!');
//         // [END_EXCLUDE]
//       });
//       // [END sendemailverification]
//     }


// export function sendPasswordReset() {
//       var email = document.getElementById('email').value;
//       // [START sendpasswordemail]
//       firebase.auth().sendPasswordResetEmail(email).then(function() {
//         // Password Reset Email Sent!
//         // [START_EXCLUDE]
//         alert('Password Reset Email Sent!');
//         // [END_EXCLUDE]
//       }).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         if (errorCode == 'auth/invalid-email') {
//           alert(errorMessage);
//         } else if (errorCode == 'auth/user-not-found') {
//           alert(errorMessage);
//         }
//         console.log(error);
//         // [END_EXCLUDE]
//       });
//       // [END sendpasswordemail];
//     }
    
module.exports.signup = signup;
