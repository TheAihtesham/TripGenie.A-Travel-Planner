import express from "express";
import { createPlan, getPlans, getPlanById } from "../controllers/planController.js"

const router = express.Router();

router.post("/", createPlan);      
router.get("/", getPlans);        
router.get("/:id", getPlanById);  

export default router;
