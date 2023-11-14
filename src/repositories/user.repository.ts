import { FilterQuery } from "mongoose";

import { IPaginationResponse, IQuery, IUser } from "../interfaces";
import { Person } from "../models";

class UserRepository {
  public async create(dto: IUser): Promise<IUser> {
    return await Person.create(dto);
  }
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await Person.findOne(params);
  }
  public async update(dto: FilterQuery<IUser>, userId: string): Promise<IUser> {
    return await Person.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    // const queryStr = JSON.stringify(query);
    // const queryObj = JSON.parse(
    //   queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    // );

    const { page = 1, limit = 5, sortedBy, ...searchObj } = query;
    const skip = +limit * (+page - 1);

    const [data, itemsFound] = await Promise.all([
      Person.find(searchObj).skip(+skip).limit(+limit).sort(sortedBy),
      Person.count(searchObj),
    ]);
    return { page, limit, itemsFound, data };
  }

  public async delete(userId: string): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne({ _id: userId });
    return !!deletedCount;
  }
}

const userRepository = new UserRepository();

export { userRepository };
