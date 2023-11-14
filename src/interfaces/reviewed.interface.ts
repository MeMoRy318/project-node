import { Types } from "mongoose";

import { ICar } from "./car.interface";

interface IReviewed extends Document {
  carId: string | ICar | Types.ObjectId;
  // createdAt: Date;
  // updatedAt: Date;
}

export type { IReviewed };
