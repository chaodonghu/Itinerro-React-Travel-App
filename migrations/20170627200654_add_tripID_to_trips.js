exports.up = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.integer('trip_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.dropColumn('trip_id');
  });
};
