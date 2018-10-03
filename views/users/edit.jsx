var React = require("react");

class Edit extends React.Component {
  render() {

    let user = this.props.result;

    return (
      <html>
        <head />
        <body>
          <h4>Editing: {user.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/"+ user.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={user.name}
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
