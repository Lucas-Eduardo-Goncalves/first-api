import { Repository } from "typeorm";
import AppDataSource from "../../../../database";
import { User } from "../../entities/User";
import type { IUserRepository, ICreateUserDTO } from "../IUserRepositories";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
  }
}

export { UserRepository };
