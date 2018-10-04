module.exports = (pool) => {

	return {
		get: (req, res) => {

			let id = req.params.id;
			
			let query = `
						SELECT pokemon.id, pokemon.name, pokemon.img, pokemon.weight, pokemon.height, users.id AS user_id, users.name AS user_name
						FROM pokemon
						INNER JOIN users_pokemon
						ON (users_pokemon.pokemon_id = pokemon.id)
						INNER JOIN users
						ON (users.id = users_pokemon.user_id)
						WHERE pokemon.id = ${id};`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {
					res.render('pokemon/pokemon', {result:result.rows});
				}
			})
		},


	}
}