import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { userService } from "../services";

class AdminMiddleware {
  public async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user as IUser;
      if (user.status !== "administrator") {
        throw new ApiError("insufficient rights to view content", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async adminIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userService.getOneByParams({
        status: "administrator",
      });

      if (user) {
        throw new ApiError("only one admin can be registered", 400);
      }

      req.body = { ...req.body, status: "administrator" };
      next();
    } catch (e) {
      next(e);
    }
  }
}

const adminMiddleware = new AdminMiddleware();

export { adminMiddleware };
