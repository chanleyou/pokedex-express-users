module.exports = (pool) => {

	return {
		get: (req, res) => {

			let id = req.params.id;

			let pokemonQuery = `SELECT * from pokemon WHERE id = ${id};`;

			pool.query(pokemonQuery, (err, pokemonResult) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					userQuery = `SELECT * FROM users INNER JOIN users_pokemon ON (users.id = users_pokemon.user_id) WHERE users_pokemon.pokemon_id = ${id};`;

					pool.query(userQuery, (err, userResult) => {
						if (err) {
							console.error(err);
							res.sendStatus(500);
						} else {

							res.render('pokemon/pokemon', {pokemon: pokemonResult.rows[0], users: userResult.rows, cookies: req.cookies});
						}
					})
				}
			})
		},

		index: (req, res) => {

			let query = `SELECT * FROM pokemon;`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					console.log(req.cookies);
					res.render('pokemon/index', {result: result.rows, cookies: req.cookies});
				}
			})
		},

	}
}	