const router = require( 'express' ).Router();
const blogRoutes = require( './blog_routes' );
const imageRoutes = require( './image_routes' );

router.use( '/blogs', blogRoutes );
router.use( '/images', imageRoutes );

module.exports = router;