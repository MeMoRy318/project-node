import { configs } from "../configs";
import { ECurrency } from "../enums";
import { ICar } from "../interfaces";
import { interMediaSetter } from "../payload";
import { privateBankService } from "../services";

class CarPresenter {
  public async present(data: ICar): Promise<Partial<ICar>> {
    const exchangeRates = await privateBankService.getExchangeRates();
    const currency = exchangeRates.find((value) => value.ccy === data.currency);
    let buy;
    if (currency?.buy) {
      buy = +currency.buy;
    } else {
      buy = 1;
    }
    return {
      currency: ECurrency.UAH,
      price: data.price * buy,
      producer: data.producer,
      year: data.year,
      _id: data._id,
      _userId: data._userId,
      model: data.model,
      photo: data.photo ? configs.AWS_S3_BUKET_URL + data.photo : null,
      city: data.city,
    };
  }
  public async presents(data: ICar[]): Promise<Partial<ICar[]>> {
    const users: Partial<ICar[]> = [];

    for (const item of data) {
      // @ts-ignore
      users.push({
        currency: item.currency,
        _id: item._id,
        _userId: item._userId,
        model: item.model,
        city: item.city,
        price: item.price,
        year: item.year,
        producer: item.producer,
        photo: item.photo ? configs.AWS_S3_BUKET_URL + item.photo : null,
      });
      await interMediaSetter.setInterMedia();
    }
    return users;
  }
}

const carPresenter = new CarPresenter();

export { carPresenter };
