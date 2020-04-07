require('dotenv').config();

const cloudniary = require('cloudinary');

cloudniary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudniary.uploader.upload( file, (result) => {
            console.log(file, result)
            resolve({
                url: result.url,
            })
        }, {
            resource_type: "auto",
            folder: folder
        });
    });
}