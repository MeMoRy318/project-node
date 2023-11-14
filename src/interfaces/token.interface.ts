import { Document, Types } from "mongoose";

import { IUser } from "./user.interface";

interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser | string;
}

type ITokenPayload = Pick<IToken, "_userId">;

type ITokensPair = Pick<IToken, "accessToken" | "refreshToken">;

export { IToken, ITokenPayload, ITokensPair };
