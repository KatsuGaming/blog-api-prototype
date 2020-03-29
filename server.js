const express = require( 'express' );

const helmet = require( 'helmet' );
const cors = require( 'cors' );
const logger = require( 'morgan' );

const server = express();

server.use(
    express.json(),
    helmet(),
    cors(),
    logger( 'dev' )
);

server.get('/', (_, res) => res.status(200).json({ message: "Server Running..." }))

module.exports = server;