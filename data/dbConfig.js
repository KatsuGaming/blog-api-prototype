require('dotenv').config();

const knex = require( 'knex' );
const config = require( '../knexfile' );
const environment = process.env.DB_CONNECTION || 'development';
console.log(environment)
module.exports = knex( config[environment] )