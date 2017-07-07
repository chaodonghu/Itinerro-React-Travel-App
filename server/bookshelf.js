import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const ENV = process.env.NODE_ENV  || 'development';

export default bookshelf(knex(knexConfig[ENV]));
