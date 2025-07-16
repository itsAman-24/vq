import express from "express";
import getJobController from "../controller/jobController.js";

const router = express.Router();

router.post('/match-candidates', getJobController);

export default router;