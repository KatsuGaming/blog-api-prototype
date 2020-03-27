const knex = require( 'knex' );
const config = require( '../knexfile' );
const environment = process.env.DB_CONNECTION || 'testing';

module.exports = knex( config[environment] )