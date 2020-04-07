const router = require( 'express' ).Router();
const authenticationRoutes = require( './authentication_routes' );
const blogRoutes = require( './blog_routes' );
const imageRoutes = require( './image_routes' );

router.use( '/auth', authenticationRoutes );
router.use( '/blogs', blogRoutes );
router.use( '/images', imageRoutes );

module.exports = router;