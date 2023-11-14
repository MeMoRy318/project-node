import { IReviewed } from "../interfaces";
import { reviewedRepository } from "../repositories";
import { dayjsService } from "./dayjs.service";

class ReviewedService {
  public async create(carId: string): Promise<IReviewed> {
    return await reviewedRepository.create(carId);
  }

  public async viewCount(day: number, carId: string): Promise<number> {
    const previousTime = dayjsService.previousDay(day);
    return await reviewedRepository.viewCount(previousTime, carId);
  }
}

const reviewedService = new ReviewedService();

export { reviewedService };
