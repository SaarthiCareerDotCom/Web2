var React= require('react');
var auth = require('/home/hydro/Downloads/Web2/app/components/testauth.js');

 
var LogInForm = React.createClass({
   onFormSubmit:function(e){
   e.preventDefault();
   var username=this.refs.username.value;
   var email=this.refs.email.value;
   var password=this.refs.password.value;
   var repassword=this.refs.repassword.value;
   //auth.toggleSignIn(email, password);
   console.log(username,email,password);
   //auth.signup(email,password);
   //auth.sendPasswordRest();
 },
  render:function()
  {
    return(
          <div className= "login-box ">
             <form onSubmit={this.onFormSubmit}>
            <div className="row collapse expanded">
              <div className="small-12 large-6 column small-order-2 medium-order-1">
                <div className="login-box-form-section">
                  <h1 className="login-box-title">Sign up</h1>
                  <input className="login-box-input" type="text" name="username" placeholder="Username" ref="username" />
                  <input className="login-box-input" type="text" name="email" placeholder="E-mail" ref="email" />
                  <input className="login-box-input" type="password" name="password" placeholder="Password" ref="password" />
                  <input className="login-box-input" type="password" name="password2" placeholder="Retype password" ref="repassword"/>
                  <input className="login-box-submit-button" type="submit" name="signup_submit" value="Sign me up" />
                </div>
                <div className="or">OR</div>
              </div>
              <div className="small-12 medium-6 column small-order-1 medium-order-2 login-box-social-section">
                <div className="login-box-social-section-inner">
                  <span className="login-box-social-headline">Sign in with<br />your social network</span>
                  <a className="login-box-social-button-facebook"></a>
                  <a className="login-box-social-button-twitter"></a>
                  <a className="login-box-social-button-google"></a>
                </div>
              </div>
            </div>
          </form>
          </div>
    );
  }
});
module.exports=LogInForm;
