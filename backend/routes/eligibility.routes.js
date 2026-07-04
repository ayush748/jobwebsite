import express from "express";
import { checkEligibility } from "../controllers/eligibility.controller.js";

const router = express.Router();

router.post("/", checkEligibility);

export default router;