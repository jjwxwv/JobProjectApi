import express from "express";
import {
  addNewCompany,
  getCompanyProfile,
} from "../controllers/userController";

const router = express.Router();

router.route("/me").get(getCompanyProfile);
router.route("/register").post(addNewCompany);

export { router as userRouter };
