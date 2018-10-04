var React = require("react");
var Layout = require('../layout/layout');

class ReleaseButton extends React.Component {
  render () {
    
    let user = this.props.user;
    let cookies = this.props.cookies;
    let pokemon = this.props.pokemon;
  
    if (user.id === parseInt(cookies.user)) {      
      return (
        <div>
          <input type="hidden" name="user_id" value ={cookies.user} />
          <input type="hidden" name="pokemon_id" value={pokemon.id} />
          <input type="submit" className="btn btn-sm btn-success" value="Release" />
        </div>
      ) 
    } else {
      return (
        <span />
      )
    }
  }
}

class Pokemon extends React.Component {
  render() {

    let user = this.props.user;
    let cookies = this.props.cookies;
    let pokemonList = this.props.pokemon.map ( pokemon => {
      
      return (
        <li key={pokemon.id} className= "py-1">
          <form method="POST" className="form-inline" action="/ownership?_method=DELETE">
            <label className="mx-1">{pokemon.name}</label>
            <ReleaseButton user={user} cookies={cookies} pokemon={pokemon} />
          </form>
        </li>
      )
    })

    return (
      <Layout title={user.name} cookies={this.props.cookies}>
        <div className="col">
          <h1 className="my-4">{user.name}</h1> 
          <h4>{user.name}'s Pokemon:</h4>
          <ul>
            {pokemonList}
          </ul>
        </div>
      </Layout>
    )
  }
}

module.exports = Pokemon;
