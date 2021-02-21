import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async checkDuplicate(email: string, nickname: string) {
    const user = await this.findOne({ email, nickname });

    return user !== undefined;
  }

  public async updateAndReload(
    userId: number,
    options: {
      email?: string;
      nickname?: string;
      contact?: string;
      avatar?: string;
    }
  ) {
    await this.update(userId, options);
    const user = await this.findOneOrFail({ id: userId });

    return user;
  }
}
