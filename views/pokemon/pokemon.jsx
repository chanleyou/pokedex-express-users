var React = require("react");

class Pokemon extends React.Component {
  render() {

    let pokemon = this.props.result[0];
    let users = this.props.result.map (user => {
      return <li key={user.user_id}>{user.user_name}</li>
    })

    return (
      <html>
        <head />
        <body>
          <div>
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
            <h4>{pokemon.name} is owned by:</h4>
            <ul>
              {users}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
