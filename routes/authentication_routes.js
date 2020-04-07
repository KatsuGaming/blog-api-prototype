const router = require( 'express' ).Router();
const Users = require( '../models/user_model' );

const hashNewPassword = require( '../utils/authentication/hash_new_password' );
const passwordIsValid = require( '../utils/authentication/validate_password' );
const generateToken = require( '../utils/authentication/generate_token' );

router.post( '/register', async ( req, res ) => {
    try {
        if( !req.body ) res.status(400).json({ message: "Missing Data", value: req.body });

        const user = req.body;
        hashNewPassword( user );

        const addedUser = await Users.add( user );
        res.status( 201 ).json( addedUser );
    } catch( err ) {
        console.log( err )
        res.status( 500 ).json({ message: "Error With Registration", error: err });
    }
});

router.post( '/login', async ( req, res ) => {
    try {
        if( !req.body ) res.status( 400 ).json({ message: "Missing Data", value: req.body })

        const { email, password } = req.body
        const user = await Users.getBy({ email });

        if( passwordIsValid( user, password ) ) {
            const token = generateToken( user );

            res.status( 200 ).json({ user, token });
        }
    }  catch( err ) {
        console.log(err)
        res.status( 500 ).json({ message: "Error With Login", error: err });
    }
});

module.exports = router;