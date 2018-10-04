module.exports = (app, pool) => {

	const pokemon = require('./controllers/pokemon')(pool);

	// app.post('/pokemon', pokemon.create);

	// app.put('/pokemon/:id', pokemon.update);

	// app.delete('/pokemon/:id', pokemon.delete);

	// app.get('/pokemon/new', pokemon.newForm);

	// app.get('/pokemon/:id/edit', pokemon.editForm);
	
	app.get('/pokemon/:id', pokemon.get);
	
	app.get('/pokemon/', pokemon.index);

	const users = require('./controllers/users')(pool);

	app.post('/users', users.create);

	// app.put('/users/:id', users.update);

	// app.delete('/users/:id', users.delete);

	app.get('/users/new', users.newForm);

	app.post('/users/login', users.loginPost);
	
	app.post('/users/logout', users.logout);

	app.get('/', users.login);

	// app.get('/users/:id/edit', users.editForm);
	
	// app.get('/users/:id', users.get);
	
	// app.get('/users/', users.index);
}