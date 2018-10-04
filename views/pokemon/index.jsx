var React = require("react");

class Home extends React.Component {
  render() {
    
    let pokemon = this.props.result.map(pokemon => {
      return <li key={pokemon.id}>{pokemon.name}</li>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to the Pokedex!</h1>
          <ul>
            {pokemon}
          </ul>
        </body>
      </html>
    )
  }
}

module.exports = Home;
