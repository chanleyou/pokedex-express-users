var React = require("react");

class Pokemon extends React.Component {
  render() {

    let user = this.props.result;
    let pokemonList = this.props.pokemon.map ( pokemon => {
      return <li key={pokemon.id}>{pokemon.name}</li>
    })

    return (
      <html>
        <head />
        <body>
          <div>
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
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
