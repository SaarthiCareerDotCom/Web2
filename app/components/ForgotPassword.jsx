var React = require('react');
var ForgotPassword = React.createClass({
  render: function () {
    return (
      <div className="login-box">
        <form onSubmit={this.onFormSubmit}>
          <div className="row  ">
            <div className="small-12 large-5 column small-order-2 medium-order-1">
              <div className="login-box-form-section">
                <h1 className="login-box-title">Forgot Password</h1>
                <input className="login-box-input" type="email" name="email" placeholder="E-mail" />
                <button type="button" className="button primary">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
module.exports = ForgotPassword;
