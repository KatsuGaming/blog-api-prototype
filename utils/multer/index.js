const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({message: 'Unsupported Image Type'}, false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 2014 },
});

module.exports = upload;