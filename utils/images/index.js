const fs = require( 'fs' );
const Images = require( '../../models/image_model' );

const imageHelpers = {
    generateUrls: async (files, uploader) => {
        const urls = [];

        for( const file of files ) {
            const { path } = file;
     
            const newPath = await uploader(path);

            urls.push( newPath );
            fs.unlinkSync( path )
        }

        return urls
    },

    addBulk: async (urls, blog_id, user_id) => {
        const results = []

        for( let i = 0; i < urls.length; i++ ) {
            const imageData = {
                blog_id,
                user_id,
                path: urls[i].url
            }

            results.push( await Images.add( imageData ) );
        }

        return results;
    }
}

module.exports = imageHelpers;