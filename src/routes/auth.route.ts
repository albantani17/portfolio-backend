import auth from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", auth.register);

export default router