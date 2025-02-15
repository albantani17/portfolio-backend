import {v2 as cloudinary} from "cloudinary";
import env from "./env";

cloudinary.config({
   cloud_name: env.CLOUDINARY_CLOUD_NAME,
   api_key: env.CLOUDINARY_API_KEY,
   api_secret: env.CLOUDINARY_API_SECRET
})

const toDataURL = (file:Express.Multer.File) => {
   const b64 = Buffer.from(file.buffer).toString("base64");
   const data = `data:${file.mimetype};base64,${b64}`
   return data
}

const getPublicIdFromFileURL = (fileUrl:string) => {
   const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1)
   const publicId = fileName.substring(0, fileName.lastIndexOf("."))
   return publicId
}

export default {
   async uploadSingle(file: Express.Multer.File) {
      const fileDataUrl = toDataURL(file);
      const result = await cloudinary.uploader.upload(fileDataUrl,{
         resource_type: "auto"
      });
      return result
   },
   async uploadMultiple(files: Express.Multer.File[]) {
      const uploadBatch = files.map((files) => {
         const result = this.uploadSingle(files);
         return result
      })
      const result = await Promise.all(uploadBatch);
      return result
   },
   async delete(fileUrl: string) {
      const publicId = getPublicIdFromFileURL(fileUrl);
      const result = await cloudinary.uploader.destroy(publicId);
      return result
   }
}