import { Router } from "express";
import * as allergyController from "../controllers/allergyController";

/**
 * @desc Entry Point: localhost:PORT/allergy/some_string
 * based on some_string and METHODS , controller functions from allergy is invoked
 */
const router = Router();
router.get("/", allergyController.getAllAllergies);
router.post("/", allergyController.createAllergy);
router.put("/:allergyId", allergyController.updateAllergy);
router.delete("/:allergyId", allergyController.deleteAllergy);
export default router;
