var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {
    
    let pokemon = this.props.result.map(pokemon => {
      return (
        <div key={pokemon.id} className="col-6 col-md-2 my-1">
          <div className="card p-1">
            <a href={"/pokemon/" + pokemon.id}>
              <img className="card-img-top" src={pokemon.img} />
            </a>
            <p className="card-text text-center">{pokemon.name}</p>
          </div>
        </div>
      )
    });

    return (
      
      <Layout title="Pokedex" cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">Welcome to the Pokedex!</h1>
        </div>
          {pokemon}
      </Layout>
    )
  }
}

module.exports = Home;
