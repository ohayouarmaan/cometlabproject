import express from "express";
import prerun from "./prerun";
import AuthRouter from "./routes/auth";
import ProblemRouter from "./routes/problems";
import cors from "cors";
import WebHook from "./routes/wh";
import { config } from "dotenv";
import morgan from "morgan";

config();

async function main() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    try{
        await prerun();
        const port = process.env.PORT || 3000

        app.use(morgan("short"));
        app.use("/auth", AuthRouter);
        app.use("/problem", ProblemRouter);
        app.use("/wh", WebHook);

        app.listen(port, () => {
            console.log(`[SERVER] running on port: ${port}`)
        });
    } catch(error: any) {
        console.log(`[ERROR] Error listening ${error.message}`);
    }
}

main();