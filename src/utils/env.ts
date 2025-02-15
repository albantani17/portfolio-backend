import dotenv from "dotenv";

dotenv.config();

export default {
   PORT: process.env.PORT || 3000,
   DATABASE_URL: process.env.DATABASE_URL || "",
   SECRET_KEY: process.env.SECRET_KEY || "",
   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ""
}