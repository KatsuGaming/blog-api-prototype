const Blogs = require( '../../models/blog_model' );
const db = require( '../../data/dbConfig' );

const newBlog = {
    title: "blog6",
    content: "this is a blog",
    user_id: 1,
    category_id: 1
}

describe('Blog  Model Tests:', () => {
    it('Blogs.getAll() should return an array of all saved blogs', async () => {
        const blogs = await Blogs.getAll();

        expect( blogs.length ).toBe( 5 );
    });

    it('Blogs.getBy({ id: value }) should return the blog object', async () => {
        const blog = await Blogs.getBy({ id: 3 });

        expect( blog.title ).toBe( 'Blog3' );
        expect( blog.id ).toBe( 3 );
    });

    it('Blogs.getBy( null || undefined ) shoud return "Missing ID"', async () => {
        const nullBlog = Blogs.getBy( null );
        const undefinedBlog = Blogs.getBy( undefined );

        expect( nullBlog ).toBe( "No Filter Found" );
        expect( undefinedBlog ).toBe( "No Filter Found" );
    });

    it('Blogs.add( blog ) should return the added blog', async () => {
        const addedBlog = await Blogs.add( newBlog );

        await db( 'Blogs' ).where({ id: addedBlog.id }).del();

        expect( addedBlog.title ).toBe( "blog6" );
    });

    it('Blogs.add( null || undefined ) should return "No Data Found"', async () => {
        const nullBlog = await Blogs.add( null );
        const undefinedBlog = await Blogs.add( undefined );

        expect( nullBlog ).toBe( "No Data Found" );
        expect( undefinedBlog ).toBe( "No Data Found" );
    });

    it('Blogs.update( id, data ) should return the updated data', async () => {
        const updatedBlog = await Blogs.update(5, { title: "updated" })

        expect(updatedBlog.title).toBe("updated");
    });

    it('Blogs.update( id, null || undefined ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullBlog = await Blogs.update(5, null)
        const undefinedBlog = await Blogs.update(5, undefined)

        expect( nullBlog ).toBe( "Missing ID or Update Information" );
        expect( undefinedBlog ).toBe( "Missing ID or Update Information" );
    });

    it('Blogs.update( null || undefined, data ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullBlog = await Blogs.update( null, { title: "update" } )
        const undefinedBlog = await Blogs.update( undefined, { title: "update" } )

        expect( nullBlog ).toBe( "Missing ID or Update Information" );
        expect( undefinedBlog ).toBe( "Missing ID or Update Information" );
    }); 

    it('Blogs.remove( id ) should return the removed blog object', async () => {
        const addedBlog = await Blogs.add( newBlog );

        const result = await Blogs.remove( addedBlog.id )

        expect( result.id ).toBe( addedBlog.id );
    });

    it('Blogs.remove( id ) should remove a blog from the database', async () => {
        const addedBlog = await Blogs.add( newBlog );

        await Blogs.remove( addedBlog.id )

        const blogs = await Blogs.getAll();

        expect( blogs.length ).toBe( 5 );
    });

    it('Blogs.remove( null || undefined ) should return an array containing "Missing ID"', async () => {
        const nullRemove = await Blogs.remove( null )
        const unedfinedRemove = await Blogs.remove( undefined )

        expect( nullRemove ).toBe( "Missing ID" );
        expect( unedfinedRemove ).toBe( "Missing ID" );
    });
});