//This file is used to connect to Cloudinary where images will be stored

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

//Setting up an instance of CloudinaryStorage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Find a recipe',
        allowedFormates: ['jpeg', 'png', 'jpg']
    }
});


//Exporting
module.exports = {
    cloudinary,
    storage
}
