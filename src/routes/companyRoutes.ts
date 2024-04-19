import express from "express";
import {
  editCompanyProfile,
  getCompanyById,
  getCompanyProfile,
} from "../controllers/companyController";
const router = express.Router();

router.route("/me").get(getCompanyProfile).put(editCompanyProfile);

router.route("/:id").get(getCompanyById);

export { router as companyRouter };
