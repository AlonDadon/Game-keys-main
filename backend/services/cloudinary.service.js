require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { uploadImgToCloudinary, cloudinary };



async function uploadImgToCloudinary(file) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'GK_users_imgs',
    });
    return uploadResponse
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
}

