import express from "express";
import router from "./routes.js";
import dotenv from "dotenv";
import cors from "cors"
import connectDb from "./database.js";


dotenv.config({
    path: ".env"
});

const app = express();
app.use(cors())
app.use(express.json()); 
app.use("/api", router);


async function startServer() {
    await connectDb();
    app.listen(process.env.PORT, () => {
        console.log(`Connected to port ${process.env.PORT}!`);
    });
}

startServer();
