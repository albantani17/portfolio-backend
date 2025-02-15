import UserModel from "../Models/user.model";
import { Request, Response } from "express";
import * as yup from "yup";
import response from "../utils/response";
import { IReqUser, IUser } from "../utils/interface";
import { validateHeaderName } from "http";
import encrypt from "../utils/encrypt";
import { generateToken } from "../utils/jwt";

type TRegister = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string
}

type TLogin = {
   email: string;
   password: string
}

const registerValidateSchema = yup.object().shape({
   name: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required().min(8).test(
      "at-least-one-number",
      "Password must contain at least one number",
      (value) => /\d/.test(value)
   ).test(
      "at-least-one-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)),
   confirmPassword: yup.string().required().oneOf([yup.ref("password")])
})

export const auth = {
   async register(req: Request, res: Response) {
      const { name, email, password, confirmPassword } = req.body as unknown as TRegister;
      try {
         await registerValidateSchema.validate({ name, email, password, confirmPassword });
         const userExist = await UserModel.findOne({ email });
         if (userExist) {
            return response.userIsExist(res);
         }
         const result = await UserModel.create({ name, email, password });
         response.created(res, result, "User created successfully");
      } catch (error) {
         response.error(res, error);
      }
   },
   async login (req: Request, res: Response) {
      const { email, password } = req.body as TLogin;
      try {
         const user = await UserModel.findOne({ email, isActive: true });
         if (!user) {
            response.notfound(res, "User not found");
            return;
         }
         const validatePassword: boolean = encrypt(password) === user.password;
         if (!validatePassword) {
            response.unauthorized(res, "Invalid password");
            return;
         }
         const token = generateToken({ id: user._id});
         response.success(res, {token}, "User logged in successfully");
      } catch (error) {
         response.error(res, error);
      }
   },
   async me(req: IReqUser, res: Response) {
      try {
         const user = req.user;

         if (!user) {
            response.unauthorized(res, "Unauthorized");
            return;
         }
   
         const result = await UserModel.findById(user.id);
         if (!result) {
            response.notfound(res, "User not found");
            return;
         }
         response.success(res, result, "User found successfully");
      } catch (error) {
         response.error(res, error);
      }
   }
}


export default auth