import express from "express";
import {
  editCompanyProfile,
  getCompanyById,
  getCompanyProfile,
} from "../controllers/companyController";
const router = express.Router();

// router.route("/me").get(getCompanyProfile).put(editCompanyProfile);
router.route("/:id").get(getCompanyById);
//temp
router.route("/:id").get(getCompanyProfile).put(editCompanyProfile);

export { router as companyRouter };
