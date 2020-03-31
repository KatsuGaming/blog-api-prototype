const server = require( 'express' )();
const middleware = require( './middleware' );
const routes = require( './routes' );

server.use( middleware );
server.use( '/api', routes );

server.get('/', (_, res) => res.status(200).json({ message: "Server Running..." }));

module.exports = server;