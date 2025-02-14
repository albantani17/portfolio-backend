import authRouter from "./auth.route";
import express from "express";

const app = express();

app.use("/auth", authRouter);

export default app;