import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IQuery, IUser } from "../interfaces";
import { userPresenter } from "../presenters";
import { authService, userService } from "../services";

class UserController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(req.body as IUser);
      res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user;
      res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as IUser;
      const { userId } = req.params;
      const user = await userService.update(body, userId);
      res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }
  public async premium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.res.locals.user as IUser;
      const user = await userService.update(
        { premium: true },
        String(body._id),
      );

      res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }
  public async updateAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.res.locals.user as IUser;
      const file = req.files.avatar as UploadedFile;
      const user = await userService.updateAvatar(body, file);
      res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      await userService.delete(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getMany(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userService.getMany(req.query as IQuery);
      res.status(200).json({
        data: { ...users, data: await userPresenter.presents(users.data) },
      });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
