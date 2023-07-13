import { NextFunction, Router, Request, Response } from "express";
import User from "../models/user";

const router = Router();

router.post("/signup", async (req: Request<{}, {}, {name: string; email: string; password: string;}>, res: Response, next: NextFunction) => {
    if(req.body.name == "" || !req.body.email.includes("@") || !req.body.email.includes(".")) {
        return res.json({
            message: "Invalid details"
        });
    } else if(req.body.password.length < 5) {
        return res.json({
            message: "Password must be of length > 5"
        });
    };
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        await newUser.save();
    } catch(e: any) {
        if(e.message == "A User with the same details already exists."){
            return res.json({
                message: e.message
            });
        } else {
            console.error(e);
            return res.json({
                message: "Something went wrong."
            });
        }
    }
    return res.json({
        message: "User Created"
    })
});

export default router;