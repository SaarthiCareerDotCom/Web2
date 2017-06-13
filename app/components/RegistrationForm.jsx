import React from 'react';
// <<<<<<< HEAD
// import firebase from '../configuration/firebase-config'
// var {Link} = require('react-router');
// =======
import firebase from '../configuration/firebase-config';
import Input from './common/InputField';
import { Link } from 'react-router';

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e

var Main = require('Main');
var RegistrationForm = React.createClass({
  getInitialState: function() {
		return {
			step: 1
		}
	},
  register: function (aUser) {
// <<<<<<< HEAD
      // firebase.auth().createUserWithEmailAndPassword(aUser.email, aUser.password)
      // .then(function(firebaseUser){
      //   var uid = firebaseUser.uid;
      //   console.log(uid);
      // //  firebase.database().ref('saarthi').child('users').child(uid.toString()).set(aUser);
      //
        fetch('/users/payment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // name: aUser.name,
            // email: aUser.email,
            // id:uid
             id : '4',
             name : 'xyz',
             amount : '900',
             purpose : 'temp',
             email : 'foo@gmail.com',
             phone : '1234567890'
          })
        })
        .then(function(res){
            console.log('okay');
            // return res.json();
            // function()

// <<<<<<< HEAD
//             // re.redirect("https://test.instamojo.com/@himanshu_667c4/c3e915b198f141d6891455b35dc9a806");
//             // return (res.json());
//           })
//           // .then(function(d){
//           //   // res.redirect(d);
//           //   fetch(d,{
//           //     headers: {
//           //       'Accept': 'application/json',
//           //       'Content-Type': 'application/json',
//           //       'mode': 'cors'
//           //     }
//           //   }).then(function(res){
//           //     // return res.json();
//           //       console.log('in redirect');
//           // //       // function()
//           // //
//           // //       re.redirect("https://test.instamojo.com/@himanshu_667c4/c3e915b198f141d6891455b35dc9a806");
//           //     });
//           // })
//
//           .catch(function(err){
//             console.log(err);
//           });
//
//
//         // });
// // =======
// //       firebase.auth().createUserWithEmailAndPassword(aUser.email, aUser.password)
// //       .then(function(firebaseUser){
// //         var uid = firebaseUser.uid;
// //         console.log(uid);
// //         fetch('http://localhost:3000/users/register', {
// //   method: 'POST',
// //   headers: {
// //     'Accept': 'application/json',
// //     'Content-Type': 'application/json',
// //   },
// //   body: JSON.stringify({
// //     name: aUser.name,
// //     email: aUser.email,
// //     id:uid
// //   })
// // })
// // .then(function(res){
// //   //return res.json();
// //     console.log('okay');
// //   }).catch(function(err){
// //     console.log(err);
// //   })
// //
// // >>>>>>> c115fab2b3625ef2a37ef312de10688c63a3dcb4
//
//
//
//       /*.catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         if(error == NULL){
//           console.log("user created");
//         }
//         if (errorCode == 'auth/weak-password') {
//           console.log(errorMessage);
//         } else {
//           console.log(errorMessage);
//         }
//         console.log(error);
//       });*/
//
//     /*  var user = firebase.auth().currentUser;
//       var uid;
//
//       uid = user.uid;
//       console.log(uid);*/
//     },
//
//
//
//   onFormSubmit: function(e) {
//     e.preventDefault();
//   //  var name,email,password,password2;
//     var aUser = {
//      'name' : this.refs.name.getValue(),
//      'email' : this.refs.email.getValue(),
//      'password' : this.refs.password.getValue(),
//      'repassword' : this.refs.password2.getValue()
//
//   };
//   //  console.log(username, email, password, repassword);
// //    console.log(username,email,password);
// //console.log(username);
//     this.register(aUser);
//      this.nextStep();
// =======
  getInitialState: function () {
    return {
      signupError: "",
      verifyEmailMessage: ""
    };
  },
  setInitialState: function () {
    this.setState({
      signupError: "",
      verifyEmailMessage: ""
    });
  },

  registerViaEmail: function (email, password) {
    var _this = this;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
      var uid = firebaseUser.uid;
      var emailVerified = firebaseUser.emailVerified;
      var email = firebaseUser.email;

      console.log(email, uid, emailVerified);
      firebaseUser.sendEmailVerification().then(() => {
        _this.setState({
          verifyEmailMessage: "Signup Successful: verification email is sent to your email address, please verify the same"
        });
      });
    }).catch((error) => {
      this.setState({
        signupError: error.message
      });
    });
  },

  signupViaSocialMedia: function (Provider) {
    firebase.auth().signInWithPopup(Provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
    }).catch(function (error) {
      this.setState({
        signupError: error.message
      })
    });
  },

  //Google
  googleSignIn: function () {
    this.signupViaSocialMedia(googleProvider);
  },

  //Facebook
  facebookSignIn: function () {
    this.signupViaSocialMedia(facebookProvider);
  },

  //LinkedIn
  linkedIn: function () {
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    var username = this.refs.name.getValue();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var repassword = this.refs.password2.getValue();

    if(this.validateUserName(username) &&
        this.validateEmail(email) &&
        this.validatePassword(password) &&
        this.validateConfirmPassword(repassword)) {

      this.setInitialState();
      this.registerViaEmail(email, password);
    }
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
  },

  validateUserName: function (value) {
    return value != "";
  },

  validateEmail: function (value) {
    var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailExpression.test(value);
  },

  validatePassword: function (value) {
    return value.length >= 6;
  },

  validateConfirmPassword: function (value) {
    return this.refs.password.getValue() === value && value.length >= 6;
  },

  render: function () {
    switch(this.state.step){
      case 1:
    return (
      <div className="login-box">
// <<<<<<< HEAD
//         <form onSubmit={this.onFormSubmit} method ="post">
// =======
        <form>
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
          <div className="row collapse expanded">
            <div className="small-12 large-6 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">Sign up</h1>
                 <Input ClassName="login-box-input" type="text" name="username" placeholder="Name"
                  errorMessage="Name field cannot be empty" validate={this.validateUserName} ref="name" />
                <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                  errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                <Input className="login-box-input" type="password" name="password" placeholder="Password"
                  errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                <Input className="login-box-input" type="password" name="password2" placeholder="Retype password"
                  errorMessage="confirmed password doesnot match with password" validate={this.validateConfirmPassword} ref="password2" />
                <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Sign me up" />
                {this.state.signupError && <p>{this.state.signupError}</p>}
                {this.state.verifyEmailMessage && <p>{this.state.verifyEmailMessage}</p>}
                <div>Already Have an account?<Link to={'/login'}>LogIn</Link></div>
              </div>
            </div>
            <div className="small-12 large-6 column small-order-2 medium-order-1 login-box-social-section">
              <div className="login-box-social-section-inner">
                <span className="login-box-social-headline">Sign in with<br />your social network</span>
// <<<<<<< HEAD
//                   <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
//                   <br />
//                     <br />
//                       <br />
//                       <button type="button" className="loginBtn loginBtn--google">Google</button>
//                         <br />
//                           <br />
//                             <br />
//                       <button type="button"  className="loginBtn loginBtn--linkdin">LinkedIn</button>
//               </div>
//             </div>
//             </div>
//           </form>
//         </div>
//     );
//
// case 2:
// return <Main />;
// }
// },
//   nextStep: function() {
//      this.setState({
//     step : this.state.step + 1
//   })
// },
//
// });
// var Input = React.createClass({
//   getDefaultProps: function () {
//     return {
//       className: "",
//       type: "text",
//       name: "",
//       placeholder: "",
//       validate: null
//     }
//   },
//
//   getInitialState: function () {
//     return {
//       value: null,
//       errorMessage: "",
//       errorVisible: false
//     }
//   },
//   validation: function (value, valid) {
//     var message = "";
//     var errorVisible = false;
//     if (valid == false) {
//       message = this.props.errorMessage;
//       errorVisible = true;
//     }
//     this.setState({
//       value: value,
//       errorMessage: message,
//       errorVisible: errorVisible
//     });
//   },
//
//   getValue: function () {
//     return this.refs.input.value;
//   },
//
//   handleFocusChange: function (event) {
//     if (this.props.validate) {
//       var valid = this.props.validate(event.target.value);
//     }
//     this.validation(event.target.value, valid);
//   },
//   render: function () {
//     return (
//       <div>
//         <input className={this.props.ClassName} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} onBlur={this.handleFocusChange} ref="input" />
//         {this.state.errorVisible && <div>{this.props.errorMessage}</div>}
// =======
                <button className="loginBtn loginBtn--facebook" onClick={this.facebookSignIn}>Facebook</button>
                <br />
                <button className="loginBtn loginBtn--google" onClick={this.googleSignIn}>Google</button>
                <br />
                <button className="loginBtn loginBtn--linkdin" onClick={this.linkedInSignIn}>LinkedIn</button>
              </div>
            </div>
          </div>
        </form>
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
      </div>
    );
  }
});

module.exports = RegistrationForm;
//export default withRouter('RegistrationForm');
