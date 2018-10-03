var React = require("react");

class Edit extends React.Component {
  render() {

    let user = this.props.user;

    let listPokemon =this.props.pokemon.map (pokemon => {
      return <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
    })

    return (
      <html>
        <head />
        <body>
          <h4>Editing: {user.name}</h4>
          <form
            method="POST"
            action={"/users/"+ user.id + "?_method=PUT"}
          >
            <div>
              name:<input
                name="name"
                type="text"
                defaultValue={user.name}
              />
            </div>
          </form>
            <div>
              <h4>Catch a Pokemon!</h4>
              <form
                method="POST"
                action={"/catches/"+ user.id}
              >
                <select name="pokemon_id">
                  {listPokemon}
                </select>
                <input name="submit" type="submit" />
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
