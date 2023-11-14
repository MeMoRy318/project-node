import { Document, Types } from "mongoose";

import { ECarStatus, ECurrency } from "../enums";
import { IUser } from "./user.interface";

interface ICar extends Document {
  _userId?: Types.ObjectId | string | IUser;
  status: ECarStatus;
  currency: ECurrency;
  model: string;
  year: number;
  producer: string;
  price: number;
  photo: string;
  city: string;
}

export type { ICar };
