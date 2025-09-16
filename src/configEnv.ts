import {config} from 'dotenv'

config()

export const ENV_VARIABLES = {
    PORT: process.env.PORT || 4000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH,
    MODE: process.env.MODE,
    MONGO_SEARCH_INDEX: process.env.MONGO_SEARCH_INDEX,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    MY_SERVER_URL: process.env.MY_SERVER_URL || `http://localhost:${process.env.PORT}`,
    PROD: process.env.PROD || false,
    CORS_URL: process.env.CORS_URL || 'http://localhost:9000'

}