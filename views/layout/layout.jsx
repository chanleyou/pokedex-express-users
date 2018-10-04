var React = require('react');

class Layout extends React.Component {

  render () {

    return (

      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa|Roboto" rel="stylesheet" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div className="container">
            <header className="row">
              <h1>List</h1>
							<form method="POST" action="/users/logout">
								<input type="submit" className="btn" value="Logout" />
							</form>
            </header>
            <main className="row">
              {this.props.children}
            </main>
          </div>
        </body>
      </html>

    )
  }
}

module.exports = Layout;
