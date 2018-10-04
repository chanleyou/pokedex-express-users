module.exports = (pool) => {

	return {
		create: (req, res) => {
			
			let user_id = req.body.user_id;
			let pokemon_id = req.body.pokemon_id;

			let query = `SELECT * FROM users_pokemon WHERE user_id = ${user_id} AND pokemon_id = ${pokemon_id};`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					if (result.rows.length > 0) {
						res.send("User already has this Pokemon!");
					} else {

						let insertString = `INSERT INTO users_pokemon (user_id, pokemon_id) VALUES ($1, $2);`;

						let values = [user_id, pokemon_id];	

						pool.query(query, values, (err, result) => {
							if (err) {
								console.error(err);
								res.sendStatus(500);
							} else {

								res.redirect(`/pokemon/${req.body.pokemon_id}`);
							}
						})
					}
				}
			})
		},

		delete: (req, res) => {

			let user_id = req.body.user_id;
			let pokemon_id = req.body.pokemon_id;

			let query = `DELETE FROM users_pokemon WHERE user_id = ${user_id} AND pokemon_id = ${pokemon_id};`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					res.redirect(`/users/${user_id}`);
				}
			})
		},

	}
}	