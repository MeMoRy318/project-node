import { configs } from "../configs";
import { IUser } from "../interfaces";
import { interMediaSetter } from "../payload";

class UserPresenter {
  public present(user: IUser): Partial<IUser> {
    return {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      status: user.status,
      premium: user.premium,
      avatar: user.avatar ? configs.AWS_S3_BUKET_URL + user.avatar : null,
    };
  }
  public async presents(users: IUser[]): Promise<Partial<IUser[]>> {
    const usersArray: Partial<IUser[]> = [];
    for (const user of users) {
      // @ts-ignore
      usersArray.push({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        status: user.status,
        premium: user.premium,
        avatar: user.avatar ? configs.AWS_S3_BUKET_URL + user.avatar : null,
      });
      await interMediaSetter.setInterMedia();
    }
    return usersArray;
  }
}

const userPresenter = new UserPresenter();

export { userPresenter };
