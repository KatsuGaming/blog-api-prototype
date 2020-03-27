exports.up = function(knex, Promise) {
    return knex.schema.createTable('Categories', tbl => {
        // ID - auto increments
        tbl.increments();
  
        // Strings
        tbl.string( 'name' ).notNullable();
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'Categories' );
};
