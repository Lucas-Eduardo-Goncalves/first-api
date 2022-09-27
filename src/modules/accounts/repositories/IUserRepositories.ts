import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUpdateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface IUserRepository {
  create: (userData: ICreateUserDTO) => Promise<void>;
  update: (userData: IUpdateUserDTO) => Promise<void>;
  findByEmail: (userEmail: string) => Promise<User | null>;
  findById: (userId: string) => Promise<User | null>;
}

export { ICreateUserDTO, IUserRepository };
