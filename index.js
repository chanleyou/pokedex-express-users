const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const config = {
  user: 'chanleyou',
  host: '127.0.0.1',
  database: 'pokemon',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// ROUTE FUNCTIONS RAW
const getNew = (request, response) => {
  response.render('pokemon/new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;

  const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2);';
  const values = [params.name, params.height];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
};

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemonForm = (request, response) => {
  response.send("COMPLETE ME");
}

const deletePokemon = (request, response) => {
  response.send("COMPLETE ME");
}
/**
 * ===================================
 * User
 * ===================================
 */


const userNew = (request, response) => {
  response.render('users/new');
}

const userCreate = (request, response) => {

  const queryString = 'INSERT INTO users (name) VALUES ($1)';

  const values = [request.body.name];

  console.log(queryString);

  pool.query(queryString, values, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

/**
 * ===================================
 * Routes
 * ===================================
 */


// ROUTE FUNCTIONS GENERALISED

// list all of a table
const index = (request, response, table) => {

   let queryString = `SELECT * FROM ${table}`;

   pool.query(queryString, (err, result) => {
     if (err) {
       console.error('Query Error:', err.stack);
     } else {

       response.render(`${table}/home`, {table: result.rows});
     }
   })
 }
// edit form (duh)
const editForm = (request, response, table) => {

   let id = request.params.id;

   let queryString = `SELECT * FROM ${table} WHERE id=${id};`;

   pool.query(queryString, (err, result) => {
     if (err) {
       console.log('Query Error: ', err.stack);
     } else {

       response.render(`${table}/edit`, {result: result.rows[0]});
     }
   })
 }

 // new form (duh)
const newForm = (request, response, table) => {
   response.render(`${table}/new`);
 }
const getItem = (request, response, table) => {

  let id = request.params.id;

  let queryString = `SELECT * FROM ${table} WHERE id =${id};`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query Error:', err.stack);
    } else {
      console.log('Query Result:', result);

      response.render( `${table}/${table}`, {result: result.rows[0]});
    }
  })
}

app.get('/pokemon/:id/edit', (req, res) => {
  editForm(req, res, "pokemon");
});

app.get('/users/:id/edit', (req, res) => {
  editForm(req, res, "users");
})

app.get('/pokemon/new', (req, res) => {
  newForm(req, res, "pokemon");
});

app.get('/users/new', (req, res) => {
  newForm(req, res, "users");
});

app.get('/pokemon/:id', (req, res) => {
  getItem(req, res, "pokemon");
});

app.get('/users/:id', (req, res) => {
  getItem(req, res, "users");
});

app.get('/pokemon/', (req, res) => {
  index(req, res, "pokemon");
})

app.get('/users/', (req, res) => {
  index(req, res, "users");
})


app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users




app.get('/users/new', userNew);
app.post('/users', userCreate);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
