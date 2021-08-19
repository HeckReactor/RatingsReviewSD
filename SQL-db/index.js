const { Pool } = require('pg');

const pool = new Pool({
  user: 'calvin',
  host: 'localhost',
  database: 'reviewsratings',
  password: '',
  port: 5432,
  max: 15,
  connectionTimeoutMillis: 2000,
});
module.exports = pool;
