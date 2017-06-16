var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav_logout = React.createClass({
  onSearch: function (e) {
      e.preventDefault();
      alert('Not yet wired up!');
  },
  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Saarthi Career</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.onSearch}>
            <ul className="menu">
              <li>
                <Link to="/">
                <input type="submit" className="button" value="Logout"/>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Nav_logout;
