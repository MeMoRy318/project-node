import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { carService } from "../services";

class CarMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId } = req.params;
      const car = await carService.getById(carId);
      if (!car) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      req.res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getByCarIdAndUserIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id, status } = req.res.locals.user as IUser;
      const { carId } = req.params;
      const car = await carService.getById(carId);

      const isAdmin = status === "administrator";
      const isManager = status === "manager";
      const isUserCar = String(car?._userId) === String(_id);

      if (!car) {
        throw new ApiError("Not found", 404);
      }

      if (isAdmin || isManager || isUserCar) {
        req.res.locals.car = car;
        next();
      } else {
        throw new ApiError("You do not have rights to this action", 403);
      }
    } catch (e) {
      next(e);
    }
  }

  public async countCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id, premium } = req.res.locals.user as IUser;

      if (!premium) {
        const countCars = await carService.getCountCarById(String(_id));
        if (countCars >= 1) {
          throw new ApiError("one ad can be added without a premium", 403);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

const carMiddleware = new CarMiddleware();

export { carMiddleware };
