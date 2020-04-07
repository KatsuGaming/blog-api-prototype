exports.up = function(knex, Promise) {
    return knex.schema.createTable('Users', tbl => {
        // ID - auto increments
        tbl.increments();
  
        // Strings
        tbl.string( 'email' ).notNullable().unique();
        tbl.string( 'password' ).notNullable();
        tbl.string( 'created_at' ).notNullable()
                                .defaultTo( new Date().toLocaleDateString() )
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'Users' );
};
