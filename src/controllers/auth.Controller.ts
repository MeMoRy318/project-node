import { NextFunction, Request, Response } from "express";

import { IToken, IUser } from "../interfaces";
import { authService } from "../services";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { accessToken, refreshToken } = (await authService.login(
        req.res.locals.user as IUser,
      )) as IToken;
      res.status(201).json({ data: { accessToken, refreshToken } });
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthController();

export { authController };
