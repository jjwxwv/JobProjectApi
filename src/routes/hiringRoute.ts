import express from "express";
import { getHiring } from "../controllers/hiringController";
const router = express.Router();

router.route("/").get(getHiring);
export { router as hiringRouter };
