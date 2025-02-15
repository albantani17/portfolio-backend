import { Router } from "express";
import mediaController from "../controllers/media.controller";
import mediaMiddleware from "../middlewares/media.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload-single", [authMiddleware ,mediaMiddleware.single("file")], mediaController.single);
router.post("/upload-multiple", [authMiddleware ,mediaMiddleware.multiple("files")], mediaController.multiple);
router.delete("/delete-file", authMiddleware,mediaController.delete);

export default router