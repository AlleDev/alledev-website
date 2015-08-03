var React = require('react');
var DefaultLayout = require('./layouts/test_layout');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <h3>{this.props.title}</h3>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
