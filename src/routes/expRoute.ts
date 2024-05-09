import express from "express";
import { getExp } from "../controllers/expController";

const router = express.Router();

router.route("/").get(getExp);
export { router as expRouter };
