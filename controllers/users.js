const sha256 = require ('js-sha256');

module.exports = (pool) => {

	const SALT = "micropotato";
	
	return {

		login: (req, res) => {

			if (req.cookies.loggedin) {
				res.redirect('/pokemon/');
			} else {				
				res.render ('users/login', {cookies: req.cookies});
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

					if (result.rows.length === 0) {

						res.send("No such user!");

					} else {

						if (password === result.rows[0].password) {

							let userid = result.rows[0].id;

							let currentSessionCookie = sha256(userid + 'loggedin' + SALT);
	
							res.cookie('loggedin', currentSessionCookie);
							res.cookie('user', userid);
							res.cookie('username', result.rows[0].name);
	
							res.redirect('/pokemon/');
						} else {
	
							res.send("Incorrect password!");
						}
					}					
				}
			})
		},

		logout: (req, res) => {
			
			res.clearCookie('loggedin');
			res.clearCookie('user');
			res.clearCookie('username');

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

								res.redirect('/');
							}
						})
					}
				}
			})
		},

		newForm: (req, res) => {

			if (req.cookies.loggedin) {
				res.redirect('/pokemon/');
			} else {				
				res.render ('users/new', {cookies: req.cookies});
			}
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