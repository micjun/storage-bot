const { Pool } = require('pg');
require('dotenv').config();
const URI = process.env.URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
