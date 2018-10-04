var React = require('react');

class LogoutButton extends React.Component {

  render () {
    
    if (this.props.cookies.loggedin) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-link"> 
            <a className="nav-link" href={'/users/' + this.props.cookies.user}>{this.props.cookies.username}</a>
          </li>
          <li className="nav-item nav-link">
            <form method="POST" action="/users/logout" className="form-inline navbar-right">
              <input type="submit" className="btn btn-outline-light" value="Logout" />
            </form>
          </li>
        </ul>

      )
    } else return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"> 
          <form method="GET" action="/">
            <div className="btn-group">
              <input type="submit" className="btn btn-outline-light" value="Login" />
              <input type="submit" className="btn btn-outline-light" value="Register" formAction="/users/new" />
            </div>
          </form>
        </li>
      </ul>
    )
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-brand" href="#">Pokedex</li>
              <li className="nav-item"> 
                <a className="nav-link" href="/pokemon/">Pokemon</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/users/">Trainers</a>
              </li>
            </ul>
              <LogoutButton cookies={this.props.cookies}/>
          </div>
        </nav>
          <div className="container">
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
