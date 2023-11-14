import Filter from "bad-words";

class BadWordsService {
  public filter;
  constructor() {
    this.filter = new Filter();
  }
  public isProfane<T>(body: T): boolean {
    const bodyValue = Object.values(body).join();
    return this.filter.isProfane(bodyValue);
  }
}

const badWordsService = new BadWordsService();

export { badWordsService };
