import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUserRepository {
  create: (userData: ICreateUserDTO) => Promise<void>;
  findByEmail: (userEmail: string) => Promise<User | null>;
}

export { ICreateUserDTO, IUserRepository };
