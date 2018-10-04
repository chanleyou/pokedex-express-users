const sha256 = require ('js-sha256');

module.exports = (pool) => {
	
	return {

		login: (req, res) => {

			if (req.cookies.loggedin) {
				res.redirect('/pokemon/');
			} else {				
				res.render ('users/login');
			}			
		},

		loginPost: (req, res) => {

			let username = req.body.name;
			let password = sha256(req.body.password);

			let query = `SELECT * FROM users WHERE name='${username}';`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {
					
					if (password === result.rows[0].password) {

						res.cookie('loggedin', 'true');
						res.cookie('user', result.rows[0].id);

						res.redirect('/pokemon/');
					} else {

						res.send("Incorrect password!");
					}
				}
			})
		},

		logout: (req, res) => {
			
			res.clearCookie('loggedin');
			res.clearCookie('user');

			res.redirect('/');
		},

		create: (req, res) => {

			let username = req.body.name;
			let password = sha256(req.body.password);

			let query = `SELECT * FROM users WHERE name='${username}';`;

			pool.query(query, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					if (result.rows.length > 0) {
						res.send("A user with that name already exists!");
					} else {
						
						let createQuery = `INSERT INTO users (name, password) VALUES ('${username}', '${password}');`;

						pool.query(createQuery, (err, result) => {
							if (err) {
								console.error(err);
								res.sendStatus(500);
							} else {

								res.redirect('users/login');
							}
						})
					}
				}
			})
		},

		newForm: (req, res) => {

			res.render('users/new');
		},

		get: (req, res) => {

			let id = req.params.id;

			let userQuery = `SELECT * from users WHERE id = ${id};`;

			pool.query(userQuery, (err, userResult) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				} else {

					pokemonQuery = `SELECT pokemon.id, pokemon.name FROM pokemon INNER JOIN users_pokemon ON (pokemon.id = users_pokemon.pokemon_id) WHERE users_pokemon.user_id = ${id};`;

					pool.query(pokemonQuery, (err, pokemonResult) => {
						if (err) {
							console.error(err);
							res.sendStatus(500);
						} else {

							res.render('users/user', {user: userResult.rows[0], pokemon: pokemonResult.rows, cookies: req.cookies});
						}
					})
				}
			})
		},

	}
}