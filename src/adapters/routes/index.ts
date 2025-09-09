import { Router } from "express";
import { profileRouter } from "./profile.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use(userRoutes)
router.use(profileRouter)

export { router as routes };

