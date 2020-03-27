const db = require( '../data/dbConfig' );
const BaseModel = require( './base_model' );

class Users extends BaseModel {

}

module.exports = new Users( 'Users' );