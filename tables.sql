DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_pokemon;

CREATE TABLE IF NOT EXISTS pokemon (
  id SERIAL PRIMARY KEY,
  name TEXT,
  img TEXT,
  weight TEXT,
  height TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS users_pokemon (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  pokemon_id INTEGER
);
