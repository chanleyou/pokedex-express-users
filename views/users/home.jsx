var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this);
    return (
      <html>
        <head />
        <body>
          <h1>Users</h1>
          <ul>
            {this.props.table.map(user => (
              <li key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
