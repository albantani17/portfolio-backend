import { IReqUser } from "../utils/interface";
import { Response } from "express";
import response from "../utils/response";
import uploader from "../utils/uploader";

export default {
   async single(req: IReqUser, res: Response) {
      if (!req.file) {
         return response.notfound(res, "File not found");
      }
      try {
         const result =  await uploader.uploadSingle(req.file as Express.Multer.File);
         response.success(res, result, "File uploaded successfully");
      } catch (error) {
         response.error(res, error);
      }
   },
   async multiple(req: IReqUser, res: Response) {
      if (!req.files || req.files.length === 0) {
         return response.notfound(res, "Files not found");
      }
      try {
         const result =  await uploader.uploadMultiple(req.files as Express.Multer.File[]);
         response.success(res, result, "Files uploaded successfully");
      } catch (error) {
         response.error(res, error);
      }
   },
   async delete(req: IReqUser, res: Response) {
      if(!req.body.fileUrl) {
         return response.notfound(res, "File not found");
      }
      try {
         const { fileUrl } = req.body;
         const result = await uploader.delete(fileUrl);
         response.success(res, result, "File deleted successfully");
      } catch (error) {
         response.error(res, error);
      }
   }
}