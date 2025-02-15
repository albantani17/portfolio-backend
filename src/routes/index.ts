import authRouter from "./auth.route";
import express from "express";
import mediaRouter from "./media.route";

const app = express();

app.use("/auth", authRouter);
app.use("/media", mediaRouter)

export default app;