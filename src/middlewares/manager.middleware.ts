import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";

class ManagerMiddleware {
  public async isAdminOrManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user as IUser;
      if (user.status === "administrator" || user.status === "manager") {
        next();
      } else {
        throw new ApiError("insufficient rights to view content", 403);
      }
    } catch (e) {
      next(e);
    }
  }
}

const managerMiddleware = new ManagerMiddleware();

export { managerMiddleware };
