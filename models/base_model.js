const db = require( '../data/dbConfig' );

class Model {
    constructor( name ) {
        this.name = name;
    }

    getAll() {
        return db(this.name);
    }

    getBy( filter ) {
        if( !filter ) return  "No Filter Found"

        return db( this.name ).where( filter ).first();
    }

    async add( data ) {
        if( !data ) return "No Data Found"

        await db( this.name ).insert( data );
        
        const users = await db( this.name );
        const newUser = users[ users.length-1 ];

        return newUser;
    }

    async update( id, data ) {
        if( !id || !data ) return "Missing ID or Update Information"

        const success = await db( this.name ).where({ id })
                                             .update( data )
                                             .returning('*');

        if( success ) return db( this.name ).where({ id }).first();
        else return "Error While Updating";
    }

    async remove( id ) {
        if( !id ) return "Missing ID"

        const removedUser = await db( this.name ).where({ id }).first();

        await db( this.name ).where({ id }).del();

        return removedUser;
    }
}

module.exports = Model;