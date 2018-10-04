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

// ROUTES 
require('./routes',)(app, pool);

// ROUTE FUNCTIONS GENERALISED

// // list all of a table
// const index = (request, response, table) => {

//    let queryString = `SELECT * FROM ${table}`;

//    pool.query(queryString, (err, result) => {
//      if (err) {
//        console.error('Query Error:', err.stack);
//      } else {

//        response.render(`${table}/home`, {table: result.rows});
//      }
//    })
//  }
// // edit form (duh)
// const editForm = (request, response, table) => {

//    let id = request.params.id;

//    let queryString = `SELECT * FROM ${table} WHERE id=${id};`;

//    pool.query(queryString, (err, result) => {
//      if (err) {
//        console.log('Query Error: ', err.stack);
//      } else {

//        response.render(`${table}/edit`, {result: result.rows[0]});
//      }
//    })
//  }

//  // new form (duh)
// const newForm = (request, response, table) => {
//    response.render(`${table}/new`);
//  }

// app.post('/catches/:id', (req, res) => {

//   console.log("Hello!");

//   let id = req.params.id;

//   let pokeId = req.body.pokemon_id;

//   let insertString = `INSERT INTO users_pokemon (user_id, pokemon_id) VALUES ($1, $2);`;

//   let values = [id, pokeId];

//   pool.query(insertString, values, (err, result) => {
//     if (err) {
//       console.error('Query Error:', err.stack);
//     } else {
//       console.log('Query Result:', result);

//       res.redirect(`/users/${id}/`);
//     }
//   })
// })

// app.get('/pokemon/:id/edit', (req, res) => {
//   editForm(req, res, "pokemon");
// });

// app.get('/pokemon/new', (req, res) => {
//   newForm(req, res, "pokemon");
// });

// app.get('/users/new', (req, res) => {
//   newForm(req, res, "users");
// });


// app.get('/users/:id', (req, res) => {

//     let id = req.params.id;

//     let queryString = `SELECT * FROM users WHERE id =${id};`;

//     pool.query(queryString, (err, result) => {
//       if (err) {
//         console.error('Query Error:', err.stack);
//       } else {
//         console.log('Query Result:', result);

//         let joinQuery = `SELECT pokemon.id, pokemon.name
//                         FROM pokemon
//                         INNER JOIN users_pokemon
//                         ON (pokemon.id = users_pokemon.pokemon_id)
//                         WHERE users_pokemon.user_id = ${id};`;

//         pool.query(joinQuery, (err, joinResult) => {
//           if (err) {
//             console.error('Query Error:', err.stack);
//           } else {
//             console.log('Query Result:', result);

//             res.render( `users/item`, {result: result.rows[0], pokemon: joinResult.rows});
//           }
//         })
//       }
//     })
// });


// app.get('/users/', (req, res) => {
//   index(req, res, "users");
// })

// app.get('/pokemon/:id/delete', deletePokemonForm);

// app.post('/pokemon', postPokemon);

// app.put('/pokemon/:id', updatePokemon);

// app.delete('/pokemon/:id', deletePokemon);

// app.get('/users/new', userNew);
// app.post('/users', userCreate);

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
