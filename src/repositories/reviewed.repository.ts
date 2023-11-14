import { Dayjs } from "dayjs";

import { IReviewed } from "../interfaces";
import { Reviewed } from "../models";
import { dayjsService } from "../services";

class ReviewedRepository {
  public async create(carId: string): Promise<IReviewed> {
    return await Reviewed.create({ carId });
  }

  public async viewCount(previousTime: Dayjs, carId: string): Promise<number> {
    const currentTime = dayjsService.currentTime();
    return await Reviewed.count({
      createdAt: { $gte: previousTime, $lte: currentTime },
      carId,
    });
  }
}

const reviewedRepository = new ReviewedRepository();

export { reviewedRepository };
