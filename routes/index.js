const router = require( 'express' ).Router();
const blogRoutes = require( './blog_routes' );

router.use( '/blogs', blogRoutes );

module.exports = router;