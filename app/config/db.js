const debug = require('debug')('SQL:log');
const { Pool } = require('pg');

const dbConfig = {
  connectionString: process.env.PG_URL,
};

if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = { rejectUnauthorized: false };
}
const pool = new Pool(dbConfig);
module.exports = {

  originalClient: pool,
  async query(...params) {
    debug(...params);
    return this.originalClient.query(...params);
  },
};
