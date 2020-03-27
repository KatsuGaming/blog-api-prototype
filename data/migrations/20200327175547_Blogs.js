exports.up = function(knex, Promise) {
    return knex.schema.createTable('Blogs', tbl => {
        // ID - auto increments
        tbl.increments();
  
        // Strings
        tbl.string( 'title' ).notNullable();
        tbl.string( 'content' ).notNullable();
        tbl.string( 'created_at' ).notNullable()
                                  .defaultTo( new Date().toLocaleDateString() );

        // Foreign Keys
        tbl.integer( 'user_id' ).notNullable()
                                .references( 'id' )
                                .inTable( 'Users' )
                                .onDelete( 'CASCADE' )
                                .onUpdate( 'CASCADE' )

        tbl.integer( 'category_id' ).notNullable()
                                    .references( 'id' )
                                    .inTable( 'Categories' )
                                    .onDelete( 'CASCADE' )
                                    .onUpdate( 'CASCADE' )
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'Blogs' );
};
