var React = require("react");

class Pokemon extends React.Component {
  render() {

    let pokemon = this.props.result;

    return (
      <html>
        <head />
        <body>
          <div>
            <ul className="pokemon-list">
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
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
