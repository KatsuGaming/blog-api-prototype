const db = require( '../data/dbConfig' );
const BaseModel = require( './base_model' );

class Blogs extends BaseModel {
    // ** TODO **
    /*
        fullDetails method refactor - add an additional join the Images table on Blog ID to retrieve image paths without requiring a second query

        allBlogsDetails - implement similiar join to return images of all blogs

        formatting of resuls should be the same with a key of "urls" containing an array of relevant image links
    */
    async fullDetails( blog_id ) {
        if( !blog_id ) return "Missing ID"

        const blog_details = await db(this.name).select(
                                                            'Blogs.id',
                                                            'Blogs.title',
                                                            'Blogs.content',
                                                            'Blogs.created_at',
                                                            'Categories.name as category',
                                                            'Users.email as author'
                                                        )
                                                .from( 'Blogs' )
                                                .innerJoin( 'Categories', 'Blogs.category_id', 'Categories.id' )
                                                .innerJoin( 'Users', 'Blogs.user_id', 'Users.id' )
                                                .where('Blogs.id', '=', `${blog_id}`)
                                                .first();

        const images = await db( 'Images' ).where({ blog_id });

        blog_details.urls = images.map( image => image.path );

        return blog_details
    }

    async allBlogsDetails() {
        const blogs = await db(this.name).select(
                                                    'Blogs.id',
                                                    'Blogs.title',
                                                    'Blogs.content',
                                                    'Blogs.created_at',
                                                    'Categories.name as category',
                                                    'Users.email as author',
                                                )
                                        .from( 'Blogs' )
                                        .innerJoin( 'Categories', 'Blogs.category_id', 'Categories.id' )
                                        .innerJoin( 'Users', 'Blogs.user_id', 'Users.id' )
                                  
    
        return blogs;
    }
}

module.exports = new Blogs( 'Blogs' );