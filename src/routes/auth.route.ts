import auth from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/me", authMiddleware, auth.me);
router.post("/register", authMiddleware, auth.register);
router.post("/login", auth.login);

export default router