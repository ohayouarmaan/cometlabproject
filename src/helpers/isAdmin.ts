import INewRequest from "../custom-request-type";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export default async function (req: Request, res: Response, next: NextFunction) {
    if((req as INewRequest).user){
        const found = await User.findById((req as INewRequest).user);
        if(found && found.role == "admin") {
            next();
        } else {
            return res.json({
                error: "You're not an Admin."
            });
        };
    };
};
