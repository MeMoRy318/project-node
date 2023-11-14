import { NextFunction, Request, Response } from "express";

import { fileConfigs } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req?.files?.avatar) {
        throw new ApiError("not found file add one file", 400);
      }

      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("only one file can be uploaded", 400);
      }

      const { size, mimetype } = req.files.avatar;

      if (size > fileConfigs.SIZE) {
        throw new ApiError("the file is too large", 400);
      }

      if (!fileConfigs.MIMETYPE.includes(mimetype)) {
        throw new ApiError("Format invalid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

const fileMiddleware = new FileMiddleware();

export { fileMiddleware };
