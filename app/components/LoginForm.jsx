// <<<<<<< HEAD
// var React = require('react');
// var {Link} = require('react-router');
// import firebase from '../configuration/firebase-config'
//   var LoggedIn = require('LoggedIn');
// var LogInForm = React.createClass({
//
//
// getInitialState: function() {
//   return {
//     step: 1
//   }
// },
// nextStep: function() {
//    this.setState({
//   step : this.state.step + 1
// })
// },
//
//   onFormSubmit: function(e) {
//     e.preventDefault();
//   //  var name,email,password,password2;
//     var aUser = {
//
//      'email' : this.refs.email.getValue(),
//      'password' : this.refs.password.getValue(),
//     };
//
//     this.login_user(aUser);
//     this.nextStep();
//
//
//   },
//
//
//   login_user:function(aUser){
//   firebase.auth().signInWithEmailAndPassword(aUser.email, aUser.password).catch(function(error) {
//
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//      alert('Wrong password.');
//    } else {
//      alert(errorMessage);
//    }
//
//
//
// })
// .then(function(firebaseUser){
//   console.log(firebase.auth().currentUser.uid);
//   //var uid =firebase.auth().currentUser.uid;
//   if(error == NULL){
//
//   }
// });
//
//
// },
//
//   validateEmail: function (value) {
//     var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailExpression.test(value);
// =======
import React from 'react';
import firebase from '../configuration/firebase-config.js';
import Input from './common/InputField';
import { Link } from 'react-router';
import UserDashboard from '../components/UserDashboard';

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();


var LogInForm = React.createClass({

  getInitialState: function () {
    return {
      loginError: "",
      steps: 1
    }
  },

  setInitialState: function () {
    this.setState({
      loginError: ""
    });
  },
  loginViaEmail: function (email, password) {
    var _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then((firebaseUser) => {
      this.setState({
        steps: this.state.steps + 1
      })
    }).catch(function (error) {
      console.log(error);
      _this.setState({
        loginError: error.message
      })
    });
  },

  loginViaSocialMedia: function (Provider) {
    var _this = this;
    firebase.auth().signInWithPopup(Provider).then(function (result) {
      var token = result.credential.accessToken;
      var current_user = result.user;
    }).catch(function (error) {
      _this.setState({
        loginError: error.message
      });
    });
  },

  //Google
  googleSignIn: function () {
    this.loginViaSocialMedia(googleProvider);
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
  },

  //Facebook
  facebookSignIn: function () {
    this.loginViaSocialMedia(facebookProvider);
  },
// <<<<<<< HEAD
//   render: function () {
//     switch(this.state.step){
//       case 1:
//     return (
//       <div className="login-box">
//         <form onSubmit={this.onFormSubmit} method= "post">
//           <div className="row collapse expanded">
//             <div className="small-12 large-6 column small-order-2 medium-order-1">
//               <div className="login-box-form-section">
//                 <h1 className="login-box-title">LogIn</h1>
//                 <Input ClassName="login-box-input" type="email" name="email" placeholder="E-mail"
//                   errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
//                 <Input ClassName="login-box-input" type="password" name="password" placeholder="Password"
//                   errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
//                 <Input ClassName="login-box-submit-button" type="submit" name="Login_Submit" value="LogIn" />
//                   <div ClassName="login-box-title">Don't have an account?<Link to={'/registration_form'}>Create One</Link></div>
//               </div>
//
//
//             </div>
//             <div className="small-12 medium-6 column small-order-1 medium-order-2 login-box-social-section">
//               <div className="login-box-social-section-inner">
//                 <span className="login-box-social-headline">Log in with<br />your social network</span>
//                   <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
//                   <br />
//                   <br />
//                       <button type="button" className="loginBtn loginBtn--google">Google</button>
//                         <br />
//                         <br />
//                       <button type="button"  className="loginBtn loginBtn--linkdin">LinkedIn</button>
//               </div>
//             </div>
//
//             </div>
//
//           </form>
//         </div>
//     );
//     case 2: return <LoggedIn /> ;
//   }
// }
// });
//
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
// =======

  //LinkedIn
  linkedInSignIn: function () {
    // var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
  },


  onFormSubmit: function () {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    this.setInitialState();
    this.loginViaEmail(email, password);
  },

  render: function () {
    if (this.state.steps == 1) {
      return (
        <div className="login-box">
          <form>
            <div className="row collapse expanded">
              <div className="small-12 large-6 column small-order-2 medium-order-1">
                <div className="login-box-form-section">
                  <h1 className="login-box-title">Login</h1>
                  <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                    errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                  <Input className="login-box-input" type="password" name="password" placeholder="Password"
                    errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                  <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Login" />
                  {this.state.loginError && <p>{this.state.loginError}</p>}
                  <div>Donnot have an account?<Link to={'/registration'}>create one</Link></div>
                  <div ><Link to={'/forgotpassword'}>Forgot Password</Link></div>
                </div>
              </div>
              <div className="small-12 large-6 column small-order-2 medium-order-1 login-box-social-section">
                <div className="login-box-social-section-inner">
                  <span className="login-box-social-headline">Sign in with<br />your social network</span>
                  <button className="loginBtn loginBtn--facebook" onClick={this.facebookSignIn}>Facebook</button>
                  <br />
                  <br />
                  <button className="loginBtn loginBtn--google" onClick={this.googleSignIn}>Google</button>
                  <br />
                  <br />
                  <button className="loginBtn loginBtn--linkdin" onClick={this.linkedInSignIn}>LinkedIn</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
// >>>>>>> 5846e0e80b14d11ea3330e42422703ae045d817e
    }
    else {
      return <UserDashboard />
    }
  }
});

module.exports = LogInForm;
