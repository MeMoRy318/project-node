import { JwtPayload, sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { EToken } from "../enums";
import { ApiError } from "../errors";
import { ITokenPayload } from "../interfaces";

class TokenService {
  public generateToken(payload: ITokenPayload, type: EToken): string {
    try {
      let secret, expiresIn;

      switch (type) {
        case EToken.ACCESS:
          secret = configs.JWT_SECRET_ACCESS;
          expiresIn = "1d";
          break;
        case EToken.REFRESH:
          secret = configs.JWT_SECRET_REFRESH;
          expiresIn = "30d";
          break;

        default:
          throw new ApiError("Invalid token type", 401);
      }

      return sign(payload, secret, { expiresIn });
    } catch (e) {
      throw new ApiError("Token generation error", 500);
    }
  }

  public verifyToken(token: string, type: EToken): string | JwtPayload {
    try {
      let secret;

      switch (type) {
        case EToken.ACCESS:
          secret = configs.JWT_SECRET_ACCESS;
          break;
        case EToken.REFRESH:
          secret = configs.JWT_SECRET_REFRESH;
          break;
        default:
          throw new ApiError("Invalid token type", 401);
      }

      return verify(token, secret);
    } catch (e) {
      throw new ApiError("Token verification error", 401);
    }
  }
}

const tokenService = new TokenService();

export { tokenService };
