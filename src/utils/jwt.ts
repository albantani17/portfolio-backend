import jwt from "jsonwebtoken";
import env from "./env";
import { IUserToken } from "./interface";

export const generateToken = (user: IUserToken) => {
   const token = jwt.sign(user,env.SECRET_KEY,{expiresIn:"1d"});
   return token
}

export const getUserData = (token: string) => {
   const user = jwt.verify(token, env.SECRET_KEY) as IUserToken;
   return user
}