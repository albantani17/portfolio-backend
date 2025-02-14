import UserModel from "../Models/user.model";
import { Request, Response } from "express";
import * as yup from "yup";
import response from "../utils/response";
import { IUser } from "../utils/interface";
import { validateHeaderName } from "http";

type TRegister = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string
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
}


export default auth