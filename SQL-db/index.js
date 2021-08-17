/* eslint-disable import/extensions */
const { Pool } = require('pg');
const config = require('../.config.js');

const pool = new Pool(config.pool);
module.exports = pool;
