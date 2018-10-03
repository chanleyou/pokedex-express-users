var React = require("react");

class Edit extends React.Component {
  render() {

    let pokemon = this.props.result;

    return (
      <html>
        <head />
        <body>
          <h4>Editing: {pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/"+ pokemon.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={pokemon.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={pokemon.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={pokemon.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={pokemon.weight}
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
