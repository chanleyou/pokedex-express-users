var React = require("react");
var Layout = require('../layout/layout')

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
      </Layout>
    );
  }
}

module.exports = Pokemon;
