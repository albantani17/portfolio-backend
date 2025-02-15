import { NextFunction, Request, Response } from "express";
import { getUserData} from "../utils/jwt";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";


export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers?.authorization

        if (!authorization) {
            return response.unauthorized(res)
        }

        const [prefix, token] = authorization.split(" ")

        if (!(prefix === "Bearer" && token)) {
            return response.unauthorized(res)
        }

        const user = getUserData(token) || null

        if (!user) {
            return response.unauthorized(res)
        }

        (req as IReqUser).user = user

        next()
    } catch (error) {
        const err = error as unknown as Error
        response.unauthorized(res, err.message)
    }
    
};