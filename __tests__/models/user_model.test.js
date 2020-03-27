const Users = require( '../../models/user_model' );
const db = require( '../../data/dbConfig' );

const newUser = { email: "me6@gmail.com" }

describe('User Model Tests:', () => {

    it('Users.getAll() should return all users', async () => {
        const users = await Users.getAll();

        expect( users.length ).toBe( 5 );
        expect( users[0].id ).toBe( 1 );
    });

    it('Users.getBy({ id: value }) should return user matching id value,', async () => {
        const user = await Users.getBy({ id: 2 });

        expect( user.id ).toBe( 2 );
    });

    it('Users.getBy({ email: value }) should return user matching email value,', async () => {
        const user = await Users.getBy({ email: 'me3@gmail.com' });

        expect( user.id ).toBe( 3 );
        expect( user.email ).toBe( 'me3@gmail.com' );
    });

    it('Users.getBy( null || undefined ) should return "No Filter Found"', async () => {
        const userNull = await Users.getBy(null);
        const userUndefined = await Users.getBy(undefined);

        expect(userNull).toBe("No Filter Found");
        expect(userUndefined).toBe("No Filter Found");
    });

    it('Users.add( user ) should return the added user with ID', async () => {
        const addedUser = await Users.add( newUser );
        const users = await db( 'Users' );

        expect( addedUser.id ).toBe( users[users.length - 1].id )
        expect( users.length ).toBe( 6 );

        await db( 'Users' ).where({ id: addedUser.id }).del();
    });

    it('Users.add( null || undefined ) should return "No Data Found"', async () => {
        const nullUser = await Users.add( null );
        const undefinedUser = await Users.add( undefined );

        expect( nullUser ).toBe( "No Data Found" );
        expect( undefinedUser ).toBe( "No Data Found" );
    });

    it('Users.update( id, data ) should return the updated data', async () => {
        const updatedUser = await Users.update(5, { email: "updated@gmail.com" })

        expect(updatedUser.email).toBe("updated@gmail.com");
    });

    it('Users.update( id, null || undefined ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullUser = await Users.update(5, null)
        const undefinedUser = await Users.update(5, undefined)

        expect(nullUser).toBe("Missing ID or Update Information");
        expect(undefinedUser).toBe("Missing ID or Update Information");
    });

    it('Users.update( null || undefined, data ) should return an array containing "Missing ID or Update Information"', async () => {
        const nullUser = await Users.update(null, { email: "update" })
        const undefinedUser = await Users.update(undefined, { email: "update" })

        expect(nullUser).toBe("Missing ID or Update Information");
        expect(undefinedUser).toBe("Missing ID or Update Information");
    }); 

    it('Users.remove( id ) should return the removed user object', async () => {
        const addedUser = await Users.add(newUser);

        const result = await Users.remove( addedUser.id )

        expect(result.id).toBe(addedUser.id);
    });

    it('Users.remove( id ) should remove a user from the database', async () => {
        const addedUser = await Users.add(newUser);

        await Users.remove( addedUser.id )

        const users = await Users.getAll();

        expect(users.length).toBe(5);
    });

    it('Users.remove( null || undefined ) should return an array containing "Missing ID"', async () => {
        const nullRemove = await Users.remove( null )
        const unedfinedRemove = await Users.remove( undefined )

        expect(nullRemove).toBe("Missing ID");
        expect(unedfinedRemove).toBe("Missing ID");
    });
});