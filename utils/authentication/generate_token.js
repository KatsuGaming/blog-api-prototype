const jwt = require( 'jsonwebtoken' );

const generateToken = user => {
    const payload = {
        subject: user.id,
        email: user.email,
        isAdmin: user.id === 1
    }

    const options = {
        expiresIn: '1h'
    }

    const secret = process.env.JWT_SECRET;

    return jwt.sign( payload, secret, options );
}

module.exports = generateToken;