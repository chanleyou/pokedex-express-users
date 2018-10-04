var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {
    
    let pokemon = this.props.result.map(pokemon => {
      return <li key={pokemon.id}>{pokemon.name}</li>;
    });

    return (
      
      <Layout title="Pokedex" cookies={this.props.cookies}>
        <h1>Welcome to the Pokedex!</h1>
        <ul>
          {pokemon}
        </ul>
      </Layout>
    )
  }
}

module.exports = Home;
