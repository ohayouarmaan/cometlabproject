import { NextFunction, Router, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

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
        const user = await newUser.save();
        const payload = {
            "user": user._id
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: '1d'
        })
        return res.json({
            email: user.email,
            accessToken
        });
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
});

export default router;