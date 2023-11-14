import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";

import { ECarStatus, EFileType } from "../enums";
import { ApiError } from "../errors";
import { ICar, IPaginationResponse, IQuery, IUser } from "../interfaces";
import { carRepository, userRepository } from "../repositories";
import { badWordsService } from "./bad-words.service";
import { dayjsService } from "./dayjs.service";
import { s3Service } from "./s3.service";

class CarService {
  public async create(data: ICar, user: IUser): Promise<ICar> {
    if (user.status === "buyer") {
      await userRepository.update({ status: "seller" }, String(user._id));
    }
    const isBadWords = badWordsService.isProfane<ICar>(data);
    const previousMinutes = dayjsService.previousMinutes(5);
    const countInactiveCar = await carRepository.getCountCarByData(
      previousMinutes,
      String(user._id),
      ECarStatus.INACTIVE,
    );

    if (isBadWords && countInactiveCar < 3) {
      await carRepository.create(
        // @ts-ignore
        { ...data, status: ECarStatus.INACTIVE },
        String(user._id),
      );
      throw new ApiError("censored vocabulary edit ad", 400);
    }

    if (countInactiveCar >= 3) {
      await Promise.all([
        carRepository.deleteMany({
          _userId: user._id,
          status: ECarStatus.INACTIVE,
        }),
        carRepository.create(
          // @ts-ignore
          { ...data, status: ECarStatus.BLOCKED },
          String(user._id),
        ),
      ]);

      throw new ApiError("your ad has been blocked", 400);
    }
    return await carRepository.create(data, String(user._id));
  }

  public async getAll(
    query: IQuery,
    status: ECarStatus,
  ): Promise<IPaginationResponse<ICar>> {
    return await carRepository.getAll(query, status);
  }

  public async delete(carId: string): Promise<boolean> {
    return await carRepository.delete(carId);
  }

  public async update(data: FilterQuery<ICar>, carId: string): Promise<ICar> {
    return await carRepository.update(data, carId);
  }
  public async updatePhoto(data: ICar, file: UploadedFile): Promise<ICar> {
    if (data.photo) {
      await s3Service.deleteFile(data.photo);
    }
    const fileKey = await s3Service.uploadFile(file, data._id, EFileType.CARS);

    return await carRepository.update({ photo: fileKey }, data._id);
  }

  public async getById(carId: string): Promise<ICar> {
    return await carRepository.getById(carId);
  }
  public async getByParams(carId: string, userId: string): Promise<ICar> {
    return await carRepository.getByParams(carId, userId);
  }

  public async getCountCarById(userId: string): Promise<number> {
    return await carRepository.getCountCarById(userId);
  }

  public async getAveragePriceByRegion(
    producer: string,
    city?: string,
  ): Promise<number> {
    return await carRepository.getAveragePriceByRegion(producer, city);
  }
}

const carService = new CarService();

export { carService };
