import joi from "joi";

import { ECurrency } from "../enums";

class CarValidator {
  static model = joi.string().min(2).max(25).trim().lowercase();
  static year = joi.number().min(1991).max(new Date().getFullYear());
  static producer = joi.string().min(2).max(25).trim().lowercase();
  static price = joi.number().min(1000).max(1000000);
  static currency = joi.valid(...Object.values(ECurrency));
  static city = joi.string().min(2).max(25).trim().lowercase();

  static create = joi.object({
    model: this.model.required(),
    year: this.year.required(),
    producer: this.producer.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    city: this.city.required(),
  });

  static update = joi.object({
    model: this.model,
    year: this.year,
    producer: this.producer,
    price: this.price,
    currency: this.currency,
    city: this.city,
  });
}

export { CarValidator };
