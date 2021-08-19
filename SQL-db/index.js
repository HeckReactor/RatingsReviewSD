/* eslint-disable import/extensions */
const { Pool } = require('pg');
const config = require('../.config.js');
// you opened a pool but never closed it yo
const pool = new Pool(config.pool);
module.exports = pool;
