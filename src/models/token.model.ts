import { model, Schema, Types } from "mongoose";

import { IToken } from "../interfaces";
import { Person } from "./user.model";

const tokensSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Token = model<IToken>("token", tokensSchema);
