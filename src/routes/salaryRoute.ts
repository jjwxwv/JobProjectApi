import express from "express";
import { getSalary } from "../controllers/salaryController";
const router = express.Router();

router.route("/").get(getSalary);
export { router as salaryRouter };
