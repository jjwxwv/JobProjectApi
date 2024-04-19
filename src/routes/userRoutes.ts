import express from "express";
import {
  addNewCompany,
  checkCompanyProfile,
} from "../controllers/userController";

const router = express.Router();

router.route("/me").get(checkCompanyProfile);
router.route("register").post(addNewCompany);

export { router as userRouter };
