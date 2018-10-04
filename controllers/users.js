const sha256 = require ('js-sha256');

module.exports = (pool) => {
	
	return {

		login: (req, res) => {
			
			res.render ('users/login');
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

						res.redirect('/pokemon/');
					} else {

						res.send("Incorrect password!");
					}
				}
			})
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
		}

	}
}