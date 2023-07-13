import express from "express";
import prerun from "./prerun";
import AuthRouter from "./routes/auth";
import cors from "cors";

async function main() {
    const app = express();

    try{
        await prerun();
        const port = process.env.PORT || 3000
        app.use("/auth", AuthRouter);
        app.listen(port, () => {
            console.log(`[SERVER] running on port: ${port}`)
        });
    } catch(error: any) {
        console.log(`[ERROR] Error listening ${error.message}`);
    }
}

main();