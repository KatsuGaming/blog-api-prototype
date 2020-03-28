const Categories = require( '../../models/category_model' );
const db = require( '../../data/dbConfig' );

describe('Category Model Tests:', () => {
    it('Categories.getAll() should return an array of all saved categories', async () => {
        const categories = await Categories.getAll();

        expect( categories.length ).toBe( 5 );
    });

    it('Categores.getBy({ id: value }) should return the string name of the category', async () => {
        const category = await Categories.getBy({ id: 3 });

        expect( category.name ).toBe( 'technology' );
        expect( category.id ).toBe( 3 );
    });

    it('Categories.getBy( null || undefined ) shoud return "Missing ID"', async () => {
        const nullCategory = Categories.getBy( null );
        const undefinedCategory = Categories.getBy( undefined );

        expect( nullCategory ).toBe( "No Filter Found" );
        expect( undefinedCategory ).toBe( "No Filter Found" );
    });

    it('Categories.add( category ) should return the added category', async () => {
        const newCategory = await Categories.add({ name: "Hello World" });

        await db( 'Categories' ).where({ id: newCategory.id }).del();

        expect( newCategory.name ).toBe( "Hello World" );
    });

    it('Categories.add( null || undefined ) should return "No Data Found"', async () => {
        const nullCategory = await Categories.add( null );
        const undefinedCategory = await Categories.add( undefined );

        expect( nullCategory ).toBe( "No Data Found" );
        expect( undefinedCategory ).toBe( "No Data Found" );
    });

    it('Categories.update( id, data ) should return the updated data', async () => {
        const updatedCategory = await Categories.update(5, { name: "updated" })

        expect(updatedCategory.name).toBe("updated");
    });

    it('Categories.update( id, null || undefined ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullCategory = await Categories.update(5, null)
        const undefinedCategory = await Categories.update(5, undefined)

        expect( nullCategory ).toBe( "Missing ID or Update Information" );
        expect( undefinedCategory ).toBe( "Missing ID or Update Information" );
    });

    it('Categories.update( null || undefined, data ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullCategory = await Categories.update( null, { name: "update" } )
        const undefinedCategory = await Categories.update( undefined, { name: "update" } )

        expect( nullCategory ).toBe( "Missing ID or Update Information" );
        expect( undefinedCategory ).toBe( "Missing ID or Update Information" );
    }); 

    it('Categories.remove( id ) should return the removed category object', async () => {
        const addedCategory = await Categories.add( { name: "Hello World" } );

        const result = await Categories.remove( addedCategory.id )

        expect( result.id ).toBe( addedCategory.id );
    });

    it('Categories.remove( id ) should remove a category from the database', async () => {
        const addedCategory = await Categories.add( { name: "Hello World" } );

        await Categories.remove( addedCategory.id )

        const categories = await Categories.getAll();

        expect( categories.length ).toBe( 5 );
    });

    it('Categories.remove( null || undefined ) should return an array containing "Missing ID"', async () => {
        const nullRemove = await Categories.remove( null )
        const unedfinedRemove = await Categories.remove( undefined )

        expect( nullRemove ).toBe( "Missing ID" );
        expect( unedfinedRemove ).toBe( "Missing ID" );
    });
});