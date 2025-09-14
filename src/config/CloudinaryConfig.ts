import { v2 as cloudinary } from 'cloudinary'
import { ENV_VARIABLES } from 'configEnv';

cloudinary.config({
    cloud_name: ENV_VARIABLES.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VARIABLES.CLOUDINARY_API_KEY,
    api_secret: ENV_VARIABLES.CLOUDINARY_API_SECRET,
    secure: true,
});




export const cloudinaryUpload = cloudinary