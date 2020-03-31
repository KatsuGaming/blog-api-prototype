const db = require( '../data/dbConfig' );
const BaseModel = require( './base_model' );

class Blogs extends BaseModel {
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

        return blog_details
    }

    async allBlogsDetails() {
        const blogs = await db(this.name).select(
                                                    'Blogs.id',
                                                    'Blogs.title',
                                                    'Blogs.content',
                                                    'Blogs.created_at',
                                                    'Categories.name as category',
                                                    'Users.email as author'
                                                )
                                        .from( 'Blogs' )
                                        .innerJoin( 'Categories', 'Blogs.category_id', 'Categories.id' )
                                        .innerJoin( 'Users', 'Blogs.user_id', 'Users.id' );

        return blogs;
    }
}

module.exports = new Blogs( 'Blogs' );