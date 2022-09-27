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

  async update(userData: ICreateUserDTO): Promise<void> {
    await this.repository.update({ email: userData.email }, userData);
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email: userEmail } });
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: userId } });
    return user;
  }
}

export { UserRepository };
