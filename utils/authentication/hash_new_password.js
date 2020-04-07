const bcrypt = require( 'bcryptjs' );

const hashNewPassword = user => {
    if( !user || !user.password ) return false;

    const hash = bcrypt.hashSync( user.password, 10 );

    user.password = hash;
}

module.exports = hashNewPassword;