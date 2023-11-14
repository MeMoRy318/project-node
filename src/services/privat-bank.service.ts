import * as https from "https";

import { configs } from "../configs";
import { IExchangeRate } from "../interfaces";

class PrivateBankService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = configs.PRIVATE_BANK_API;
  }

  public async getExchangeRates(): Promise<IExchangeRate[]> {
    return await new Promise((resolve, reject) => {
      https
        .get(this.apiUrl, (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            try {
              const result = JSON.parse(data);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}

const privateBankService = new PrivateBankService();

export { privateBankService };
