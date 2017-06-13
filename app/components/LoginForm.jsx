var React = require('react');
var {Link} = require('react-router');
import firebase from '../configuration/firebase-config'
  var LoggedIn = require('LoggedIn');
var LogInForm = React.createClass({


getInitialState: function() {
  return {
    step: 1
  }
},
nextStep: function() {
   this.setState({
  step : this.state.step + 1
})
},

  onFormSubmit: function(e) {
    e.preventDefault();
  //  var name,email,password,password2;
    var aUser = {

     'email' : this.refs.email.getValue(),
     'password' : this.refs.password.getValue(),
    };

    this.login_user(aUser);
    this.nextStep();


  },


  login_user:function(aUser){
  firebase.auth().signInWithEmailAndPassword(aUser.email, aUser.password).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
     alert('Wrong password.');
   } else {
     alert(errorMessage);
   }



})
.then(function(firebaseUser){
  console.log(firebase.auth().currentUser.uid);
  //var uid =firebase.auth().currentUser.uid;
  if(error == NULL){

  }
});


},

  validateEmail: function (value) {
    var emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailExpression.test(value);
  },

  validatePassword: function (value) {
    return value.length >= 6;
  },
  render: function () {
    switch(this.state.step){
      case 1:
    return (
      <div className="login-box">
        <form onSubmit={this.onFormSubmit} method= "post">
          <div className="row collapse expanded">
            <div className="small-12 large-6 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">LogIn</h1>
                <Input ClassName="login-box-input" type="email" name="email" placeholder="E-mail"
                  errorMessage="Email format is incorrect" validate={this.validateEmail} ref="email" />
                <Input ClassName="login-box-input" type="password" name="password" placeholder="Password"
                  errorMessage="Password should have minimum 6 characters" validate={this.validatePassword} ref="password" />
                <Input ClassName="login-box-submit-button" type="submit" name="Login_Submit" value="LogIn" />
                  <div ClassName="login-box-title">Don't have an account?<Link to={'/registration_form'}>Create One</Link></div>
              </div>


            </div>
            <div className="small-12 medium-6 column small-order-1 medium-order-2 login-box-social-section">
              <div className="login-box-social-section-inner">
                <span className="login-box-social-headline">Log in with<br />your social network</span>
                  <button type="button" className="loginBtn loginBtn--facebook">Facebook  </button>
                  <br />
                  <br />
                      <button type="button" className="loginBtn loginBtn--google">Google</button>
                        <br />
                        <br />
                      <button type="button"  className="loginBtn loginBtn--linkdin">LinkedIn</button>
              </div>
            </div>

            </div>

          </form>
        </div>
    );
    case 2: return <LoggedIn /> ;
  }
}
});

var Input = React.createClass({
  getDefaultProps: function () {
    return {
      className: "",
      type: "text",
      name: "",
      placeholder: "",
      validate: null
    }
  },

  getInitialState: function () {
    return {
      value: null,
      errorMessage: "",
      errorVisible: false
    }
  },
  validation: function (value, valid) {
    var message = "";
    var errorVisible = false;
    if (valid == false) {
      message = this.props.errorMessage;
      errorVisible = true;
    }
    this.setState({
      value: value,
      errorMessage: message,
      errorVisible: errorVisible
    });
  },

  getValue: function () {
    return this.refs.input.value;
  },

  handleFocusChange: function (event) {
    if (this.props.validate) {
      var valid = this.props.validate(event.target.value);
    }
    this.validation(event.target.value, valid);
  },
  render: function () {
    return (
      <div>
        <input className={this.props.ClassName} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} onBlur={this.handleFocusChange} ref="input" />
        {this.state.errorVisible && <div>{this.props.errorMessage}</div>}
      </div>
    );
  }
});

module.exports = LogInForm;
