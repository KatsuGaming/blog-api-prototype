const db = require( '../data/dbConfig' );
const BaseModel = require( './base_model' );

class Blogs extends BaseModel {

}

module.exports = new Blogs( 'Blogs' );