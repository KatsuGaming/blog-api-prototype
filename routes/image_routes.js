const router = require( 'express' ).Router();
const bodyParser = require( 'body-parser' );

const upload = require( '../utils/multer' );
const cloudinary = require( '../utils/cloudinary' );

const Images = require( '../models/image_model' );
const imageHelpers = require( '../utils/images' );

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get( '/', async ( _, res ) => {
    try {
        const images = await Images.getAll();

        res.status( 200 ).json( images );
    } catch(err) {
        res.status( 500 ).json({ message: "Error Retrieving Images", error: err });
    }
});

router.post( '/', upload.array('image'), async (req, res) => {
    try {
        const uploader = async path => await cloudinary.uploads( path, 'Images' );
    
        const blog_id = req.body.blog_id;
        const user_id = req.body.blog_id;

        const urls = await imageHelpers.generateUrls( req.files, uploader );
        const results = await imageHelpers.addBulk( urls, blog_id, user_id );

        res.status(201).json({ results });

    } catch(err) {
        console.log(err)
        res.status( 500 ).json({ message: "Error Uploading Images", error: err });
    }
} )

module.exports = router;
