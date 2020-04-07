const router = require( 'express' ).Router();
const authenticationRoutes = require( './authentication_routes' );
const blogRoutes = require( './blog_routes' );
const imageRoutes = require( './image_routes' );

const authenticateRequest = require( '../middleware/authenticate_request' );

router.use( '/auth', authenticationRoutes );
router.use( '/blogs', authenticateRequest, blogRoutes );
router.use( '/images', authenticateRequest, imageRoutes );

module.exports = router;