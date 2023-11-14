import { Dayjs } from "dayjs";
import { FilterQuery } from "mongoose";

import { ECarStatus } from "../enums";
import { ICar, IPaginationResponse, IQuery } from "../interfaces";
import { Car } from "../models";
import { dayjsService } from "../services";

class CarRepository {
  public async create(data: ICar, _userId: string): Promise<ICar> {
    return await Car.create({ ...data, _userId });
  }

  public async getAll(
    query: IQuery,
    status: ECarStatus,
  ): Promise<IPaginationResponse<ICar>> {
    const { page = 1, limit = 5, sortedBy, ...obj } = query;
    const searchObj = { ...obj, status };
    const skip = +limit * (+page - 1);
    const [data, itemsFound] = await Promise.all([
      Car.find(searchObj).skip(+skip).limit(+limit).sort(sortedBy),
      Car.count(searchObj),
    ]);

    return { page, limit, itemsFound, data };
  }

  public async delete(carId: string): Promise<boolean> {
    const { deletedCount } = await Car.deleteOne({ _id: carId });
    return !!deletedCount;
  }

  public async update(data: FilterQuery<ICar>, carId: string): Promise<ICar> {
    return await Car.findOneAndUpdate({ _id: carId }, data, {
      returnDocument: "after",
    }).lean();
  }

  public async getById(carId: string): Promise<ICar> {
    return await Car.findById(carId).lean();
  }
  public async getByParams(carId: string, userId: string): Promise<ICar> {
    return await Car.findOne({ _id: carId, _userId: userId });
  }
  public async getCountCarById(userId: string): Promise<number> {
    return await Car.count({ _userId: userId });
  }
  public async getCountCarByData(
    previousTime: Dayjs,
    userId: string,
    status: ECarStatus,
  ): Promise<number> {
    const currentTime = dayjsService.currentTime();
    return await Car.count({
      createdAt: { $gte: previousTime, $lte: currentTime },
      _userId: userId,
      status,
    });
  }
  public async getAveragePriceByRegion(
    producer: string,
    city: string,
  ): Promise<number> {
    const cityOrAllUkraine = city === "all" ? {} : { city };
    const [averagePriceByRegion] = await Promise.all([
      Car.aggregate([
        {
          $match: { $and: [{ ...cityOrAllUkraine }, { producer }] },
        },
        {
          $group: {
            _id: "$city",
            averagePrice: { $avg: "$price" },
          },
        },
      ]),
    ]);

    return averagePriceByRegion.length > 0
      ? averagePriceByRegion[0].averagePrice
      : 0;
  }
  public async deleteMany(data: FilterQuery<ICar>): Promise<void> {
    await Car.deleteMany(data);
  }
}

const carRepository = new CarRepository();

export { carRepository };
