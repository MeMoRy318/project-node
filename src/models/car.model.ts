import { model, Schema, Types } from "mongoose";

import { ICar } from "../interfaces";
import { Person } from "./user.model";

const schema = new Schema(
  {
    model: {
      type: String,
    },
    photo: {
      type: String,
      default: null,
    },
    year: {
      type: String,
    },

    producer: {
      type: String,
    },

    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    city: {
      type: String,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false, timestamps: true },
);

const Car = model<ICar>("cars", schema);

export { Car };
