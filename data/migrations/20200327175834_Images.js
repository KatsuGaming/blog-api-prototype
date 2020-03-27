exports.up = function(knex, Promise) {
    return knex.schema.createTable('Images', tbl => {
        // ID - auto increments
        tbl.increments();
  
        // Strings
        tbl.string( 'path' ).notNullable().unique();

        tbl.integer( 'user_id' ).notNullable()
                                .references( 'id' )
                                .inTable( 'Users' )
                                .onDelete( 'CASCADE' )
                                .onUpdate( 'CASCADE' )

        tbl.integer( 'blog_id' ).notNullable()
                                .references( 'id' )
                                .inTable( 'Blogs' )
                                .onDelete( 'CASCADE' )
                                .onUpdate( 'CASCADE' )
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'Images' );
};
