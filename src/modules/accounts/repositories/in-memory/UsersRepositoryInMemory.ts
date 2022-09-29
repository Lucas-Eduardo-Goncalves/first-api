import { AppError } from "../../../../errors/AppErrors";
import { User } from "../../entities/User";

import type {
  IUserRepository,
  ICreateUserDTO,
  IUpdateUserDTO,
} from "../IUserRepositories";

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create(userData: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, userData);

    this.users.push(user);
  }

  async update(userData: IUpdateUserDTO): Promise<void> {
    throw new AppError("Method not implemented", 500);
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    return this.users.find((user) => user.email === userEmail) || null;
  }

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) || null;
  }
}

export { UsersRepositoryInMemory };
