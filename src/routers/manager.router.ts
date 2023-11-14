import { Router } from "express";

import { authMiddleware, managerMiddleware } from "../middlewares";

const router = Router();

router.get(
  "",
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
);

export { router as managerRouter };
