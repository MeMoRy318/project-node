import { model, Schema, Types } from "mongoose";

import { IReviewed } from "../interfaces";
import { Person } from "./user.model";

const schema = new Schema(
  {
    carId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },
  },
  { versionKey: false, timestamps: true },
);

const Reviewed = model<IReviewed>("reviewers", schema);

export { Reviewed };
