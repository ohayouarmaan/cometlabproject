import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        "message": "API Working!"
    });
});

export default router;