var React = require("react");
var Layout = require('../layout/layout')

class CatchButton extends React.Component {
  render () {

    let cookies = this.props.cookies;
    let pokemon = this.props.pokemon;

    for (let i in this.props.users) {
      if (parseInt(this.props.users[i].id) === parseInt(cookies.user)) {
        console.log(this.props.user[i].id + " vs " + cookies.user);
        return <div>You have this Pokemon.</div>
      }
    }

    if (cookies.loggedin && cookies.user) {
      return (
        <form method="POST" action="/ownership">
                <input type="hidden" name="user_id" value ={cookies.user} />
                <input type="hidden" name="pokemon_id" value={pokemon.id} />
                <input type="submit" value="Catch" />
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
        <ul>
          <li className="pokemon-attribute">
            id: {pokemon.id}
          </li>
          <li className="pokemon-attribute">
            name: {pokemon.name}
          </li>
          <li className="pokemon-attribute">
            img: {pokemon.img}
          </li>
          <li className="pokemon-attribute">
            height: {pokemon.height}
          </li>
          <li className="pokemon-attribute">
            weight: {pokemon.weight}
          </li>
        </ul>
        <h4>Trainers with {pokemon.name}:</h4>
        <ul>
          {users}
        </ul>
        <CatchButton pokemon={pokemon} users={this.props.users} cookies={this.props.cookies} />
      </Layout>
    );
  }
}

module.exports = Pokemon;
