import { Types } from "mongoose";
import { Request } from "express";


export interface IUser { 
   name: string;
   email: string;
   password: string;
   profilePicture: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface IUserToken extends Omit<IUser, 
| "password"
| "isActive"
| "email"
| "profilePicture"
| "name"
| "createdAt"
| "updatedAt"
> {
   id?: Types.ObjectId;
}

export interface IReqUser extends Request {
   user?: IUserToken
}
