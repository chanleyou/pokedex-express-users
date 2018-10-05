var React = require("react");
var Layout = require('../layout/layout');

const sha256 = require ('js-sha256');
const SALT = "micropotato";

class CatchButton extends React.Component {
  render () {

    let cookies = this.props.cookies;
    let pokemon = this.props.pokemon;

    // if the logged in user is correct to the current user
    if (cookies.loggedin === sha256(cookies.user + 'loggedin' + SALT)) {
      return (
        <form method="POST" action="/ownership">
          <input type="hidden" name="user_id" value ={cookies.user} />
          <input type="hidden" name="pokemon_id" value={pokemon.id} />
          <input type="submit" className="btn btn-danger" value="Catch" />
        </form>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

class Pokemon extends React.Component {
  render() {

    let pokemon = this.props.pokemon;
    let users = this.props.users.map (user => {
      return <li key={user.id}>{user.name}</li>
    })

    return (
      <Layout title={pokemon.name} cookies={this.props.cookies}>
        <div className="col">
          <h1 className="my-4">{pokemon.name}</h1>
          <img src={pokemon.img} />
          <ul>
            <li>
              ID: {pokemon.id}
            </li>
            <li>
              Height: {pokemon.height}
            </li>
            <li>
              Weight: {pokemon.weight}
            </li>
          </ul>
          <h4>Trainers:</h4>
          <ul>
            {users}
          </ul>
          <CatchButton pokemon={pokemon} users={this.props.users} cookies={this.props.cookies} />
        </div>
      </Layout>
    );
  }
}

module.exports = Pokemon;
