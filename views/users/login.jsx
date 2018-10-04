var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
					<h1>Login</h1> 
          <form method="POST" action="/users/login">
            <label>Username:</label>
            <input type="text" name="name" required />
            <label>Password:</label>
            <input type="text" name="password" />
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
