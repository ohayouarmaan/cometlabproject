import { Router, Request, Response, NextFunction } from "express";
const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    return res.status(200);
});

export default router;
