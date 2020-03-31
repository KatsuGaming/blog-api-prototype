const router = require( 'express' ).Router();
const Blogs = require( '../models/blog_model' );

router.get( '/', async ( _, res ) => {
    try {
        const blogs = await Blogs.allBlogsDetails();

        res.status( 200 ).json( blogs );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Retrieving Blogs", error: err });
    }
});

router.get( '/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
       
        const blog = await Blogs.fullDetails( id );
    
        res.status( 200 ).json( blog );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Retrieving Blog", error: err });
    }
});

router.post( '/', async ( req, res ) => {
    try {
        const newData = req.body;

        newData.created_at = new Date().toLocaleDateString();

        const newBlog = await Blogs.add( newData );

        res.status( 201 ).json( newBlog );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Adding Blog", error: err });
    }
});

router.put( '/:id', async ( req, res ) => {
    try {
        const updateData = req.body;
        const { id } = req.params;

        const updatedBlog = await Blogs.update( id, updateData );

        res.status( 200 ).json( updatedBlog );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Updating Blog", error: err });
    }
});

router.delete( '/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const removedBlog = await Blogs.remove( id );

        res.status( 200 ).json( removedBlog );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Removing Blog", error: err });
    }
});

module.exports = router;