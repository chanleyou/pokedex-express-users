var React = require('react');

class LogoutButton extends React.Component {

  render () {
    
    if (this.props.cookies.loggedin) {
      return ( 
        <form method="POST" action="/users/logout">
          <input type="submit" className="btn" value="Logout" />
        </form>
      )
    } else return <div />
  }
}

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
              <h1>Pokedex</h1>
              <LogoutButton cookies={this.props.cookies}/>
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
