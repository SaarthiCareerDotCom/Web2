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
      userData: {
        uid: null
      }
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

    this.loginViaEmail = (email, password) => {
    var _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then((firebaseUser) => {
      
    }).catch(function (error) {
      console.log(error);
     
    });
  },

    //Google
  this.googleSignIn = () => {
    this.loginViaSocialMedia(googleProvider);
  }

  //Facebook
  this.facebookSignIn = () => {
    this.loginViaSocialMedia(facebookProvider);
  }

  //LinkedIn
  this.linkedInSignIn = () => {
    // var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
  }


  this.onFormSubmit = () => {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    this.loginViaEmail(email, password);
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
          <div className="box">
            <div className="login">
              <p className="title">Login</p>
              <div className="inputs">
              <label htmlFor="">Email</label>
              <Input className="login-box-input" type="email" name="email" placeholder="E-mail"
                    errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                  <label htmlFor="">Password</label>
                  <Input className="login-box-input" type="password" name="password" placeholder="Password"
                    errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                    </div>
                    <button className="oauth googleSignIn" onClick={this.googleSignIn}>Google</button>
              <button className="oauth facebookSignIn" onClick={this.facebookSignIn}>Facebook</button>
                  <input className="login-box-submit-button" type="button" onClick={this.onFormSubmit} value="Login" />
            </div>
          </div>
        </div>
      );


  }
};