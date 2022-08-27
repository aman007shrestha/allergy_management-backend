import { Router } from "express";
import authRoutes from "./authRoutes";
import { protectedRoute } from "../middlewares/authorization";
import allergyRoutes from "./allergyRoutes";

/**
 * @desc Entry Point: localhost:PORT/some_string
 * respect routeHandler are invoked based on some_string
 */
const router = Router();
router.use("/auth", authRoutes);
router.use("/allergy", protectedRoute, allergyRoutes);

export default router;
