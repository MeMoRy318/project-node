import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleware,
  carMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";

const router = Router();

router.get(
  "/view/:carId/:day",
  commonMiddleware.isIdValid("carId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isPremiumOrThrow,
  carMiddleware.getByCarIdAndUserIdOrThrow,
  carController.viewCount,
);

router.get(
  "/average/:producer/:city",
  authMiddleware.checkAccessToken,
  userMiddleware.isPremiumOrThrow,
  carController.averagePrice,
);

export { router as premiumRouter };
