var React = require("react");
var Layout = require('../layout/layout');

class ReleaseButton extends React.Component {
  render () {

    let user = this.props.user;
    let pokemon = this.props.pokemon;
    let cookies = this.props.cookies;

    if (parseInt(user.id) === parseInt(cookies.user)) {
      return (
        <form method="POST" action="/ownership?_method=DELETE">
          <input type="hidden" name="user_id" value ={cookies.user} />
          <input type="hidden" name="pokemon_id" value={pokemon.id} />
          <input type="submit" value="Release" />
        </form>
      )
    } else {
      return <div />
    }
  }
}

class Pokemon extends React.Component {
  render() {

    console.log(this.props.pokemon);

    let user = this.props.user;
    let pokemonList = this.props.pokemon.map ( pokemon => {
      
      return (
        <li key={pokemon.id}>
          {pokemon.name}
          <ReleaseButton user={user} pokemon={pokemon} cookies={this.props.cookies} /> 
        </li>
      )
    })

    return (
      <Layout title={user.name} cookies={this.props.cookies}> 
        <ul>
          <li>
            id: {user.id}
          </li>
          <li>
            name: {user.name}
          </li>
        </ul>
        <h4>{user.name}'s Pokemon:</h4>
        <ul>
          {pokemonList}
        </ul>
      </Layout>
    );
  }
}

module.exports = Pokemon;
