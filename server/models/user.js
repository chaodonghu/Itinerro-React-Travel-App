import bookshelf from '../bookshelf';

// console.log('shutest', JSON.stringify(bookshelf.knex.client.config));
export default bookshelf.Model.extend({
  tableName: 'users'
})
