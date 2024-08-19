const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;

        if (file.fieldname === 'profileImage') {
            uploadPath = path.join(__dirname, '../uploads/profiles/');
        } else if (file.fieldname === 'blogImage') {
            uploadPath = path.join(__dirname, '../uploads/blogs/');
        } else {
            uploadPath = path.join(__dirname, '../uploads/others/');
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only image files are allowed!');
    }
}

// Init upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image'); // You can dynamically change 'image' to 'profileImage' or 'blogImage'

module.exports = upload;
