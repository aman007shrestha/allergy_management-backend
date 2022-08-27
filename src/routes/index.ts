import { Router } from "express";
import authRoutes from "./authRoutes";

/**
 * @desc Entry Point: localhost:PORT/some_string
 * respect routeHandler are invoked based on some_string
 */
const router = Router();
router.use("/auth", authRoutes);
// router.use("/user", protectedRoute, userRoutes);

export default router;
