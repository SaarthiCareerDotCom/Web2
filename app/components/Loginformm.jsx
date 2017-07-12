import React from 'react';
import firebase from '../../common/firebase-config.js';
import Input from './common/InputField';
import Link from 'react-router';
import UserDashboard from '../components/UserDashboard';
import {Redirect} from 'react-router-dom';

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

export default class Loginformm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginError: "",
      steps: 1,
      register: false,
      userData: {
        uid: null
      }
    }

    this.changeMode = () => {
      let newState = Object.assign({}, this.state);
      newState.register = !newState.register;
      this.setState(newState);
    }
    
    this.loginViaSocialMedia = (Provider) => {
    debugger;
    var _this = this;
    firebase.auth().signInWithPopup(Provider).then(function (result) {
      var token = result.credential.accessToken;
      var current_user = result.user;
    }).catch(function (error) {
      _this.setState({
        loginError: error.message
      });
    });
  }

  this.signupViaSocialMedia = (Provider) => {
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

  this.registerViaEmail = (email, password) => {
    var _this = this;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
      var uid = firebaseUser.uid;
      var emailVerified = firebaseUser.emailVerified;
      var email = firebaseUser.email;

      console.log(email, uid, emailVerified);
      firebaseUser.sendEmailVerification().then(() => {
        
      });
    }).catch((error) => {
      this.setState({
        signupError: error.message
      });
    });
  },

    this.loginViaEmail = (email, password) => {
    var _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then((firebaseUser) => {
      
    }).catch(function (error) {
      console.log(error);
     
    });
  },

    //Google
  this.googleSignIn = () => {
    this.state.register? this.signupViaSocialMedia(googleProvider) : this.loginViaSocialMedia(googleProvider);
  }

  //Facebook
  this.facebookSignIn = () => {
    this.state.register? this.signupViaSocialMedia(facebookProvider) : this.loginViaSocialMedia(facebookProvider);
  }

  //LinkedIn
  this.linkedInSignIn = () => {
    // var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
  }

  this.validateEmail = (value) => {
    var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailExpression.test(value);
  }

  this.validatePassword = (value) => {
    return value.length >= 6;
  },

  this.validateConfirmPassword = (pass, confirmPass) => {
    return pass === confirmPass;
  },


  this.onFormSubmit = () => {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var repassword = this.refs.password2.getValue();

    if(this.validateEmail(email)) {
      if(this.validatePassword(password)){
        if(this.state.register) {
          if(!this.validateConfirmPassword(password, repassword)) {
            alert('Passwords do not match');
            return;
          }
        }
      } else {
        alert('Password incorrect');
        return;
      }  
    } else  {
      alert('Email incorrect');
      return;
    }

    this.state.register?this.registerViaEmail(email, password):this.loginViaEmail(email, password);
  }

  this.alertAuthChange = () => {
    console.log('changes happened');
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      let newState = Object.assign({}, that.state);
      newState.userData.uid = user.uid;
      newState.userData.pic = user.photoURL;
      that.setState(newState);
  } else {
    console.log('error auth change')
  }
});
  }
    
}



componentDidMount() {
  this.alertAuthChange.bind(this)();
}

  render() {

      return this.state.userData.uid ? (
        <Redirect to={{
            pathname: '/home',
          }}/>
      ) : (
        <div className="login-container">
          <div className="message">
            Login to Learning
          </div>
          <div className={`box ${this.state.register? 'register' : 'login'}`}>
            <div className="login">
              <p className="title"> {this.state.register? 'Register' : 'Login'}</p>
              <div className="inputs">
              <label htmlFor="">Email</label>
              <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                    errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
              <label htmlFor="">Password</label>
              <Input className="login-box-input" type="password" name="password" placeholder="Password"
                    errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
              <label className="for-register" htmlFor="">Confirm Password</label>
              <Input className="for-register login-box-input" type="password" name="password2" placeholder="Retype password"
                  errorMessage="confirmed password doesnot match with password" validate={this.validateConfirmPassword} ref="password2" />
                    </div>
                    <button className="oauth googleSignIn" onClick={this.googleSignIn}>Google</button>
                    <button className="oauth facebookSignIn" onClick={this.facebookSignIn}>Facebook</button>
                  <input className="login-box-submit-button for-login" type="button" onClick={this.onFormSubmit} value="Login" />
                  <input className="login-box-submit-button for-register" type="button" onClick={this.onFormSubmit} value="Register" />
            </div>
            <p className="changeMode" onClick={this.changeMode}>
              {this.state.register?'Click here if you already have an account':'Click here to make a new account'}
            </p>
          </div>
        </div>
      );


  }
};