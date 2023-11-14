import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ECarStatus } from "../enums";
import { ApiError } from "../errors";
import { ICar, IQuery, IUser } from "../interfaces";
import { carPresenter } from "../presenters";
import { carService, reviewedService } from "../services";

class CarController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as ICar;
      const user = req.res.locals.user as IUser;

      const car = await carService.create(body, user);
      res.status(201).json({ data: await carPresenter.present(car) });
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
      const cars = await carService.getAll(
        req.query as IQuery,
        ECarStatus.ACTIVE,
      );
      res.status(200).json({
        ...cars,
        data: await carPresenter.presents(cars.data),
      });
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
      const car = req.res.locals.car as ICar;
      reviewedService.create(car._id).finally();
      res.status(200).json({ data: await carPresenter.present(car) });
    } catch (e) {
      next(e);
    }
  }
  public async viewCount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId, day } = req.params;
      // леньки створювати мідлевару
      if (+day % 1 !== 0) {
        throw new ApiError("the day parameter must be a number", 400);
      }

      const viewCount = await reviewedService.viewCount(+day, carId);
      res.status(200).json({ data: { viewCount, day: +day } });
    } catch (e) {
      next(e);
    }
  }
  public async averagePrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { producer = "", city = "" } = req.params;

      const averagePrice = await carService.getAveragePriceByRegion(
        producer,
        city,
      );
      res.status(200).json({ data: { city, producer, avg: averagePrice } });
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
      const { carId } = req.params;
      await carService.delete(carId);
      res.sendStatus(204);
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
      const { carId } = req.params;
      const body = req.body;

      const car = await carService.update(body, carId);
      res.status(201).json({ data: await carPresenter.present(car) });
    } catch (e) {
      next(e);
    }
  }
  public async updatePhoto(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.res.locals.car as ICar;
      const file = req.files.avatar as UploadedFile;

      const car = await carService.updatePhoto(body, file);
      res.status(201).json({ data: await carPresenter.present(car) });
    } catch (e) {
      next(e);
    }
  }
}

const carController = new CarController();

export { carController };
