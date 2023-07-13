import jwt from "jsonwebtoken";
import INewRequest from "../custom-request-type";
import { Response, NextFunction } from "express";

export default async function (req: INewRequest, res: Response, next: NextFunction) {
    try{
        const decoded: { user: string; } = await (jwt.verify((req.headers as {"authorization": string;})['authorization'],
                            process.env.JWT_SECRET || "secret") as { user: string });
        req.user = decoded.user;
        next();
    } catch(e: any) {
        return res.json({
            error: "Invalid token"
        })
    }

}
