interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUserRepository {
  create: (userData: ICreateUserDTO) => Promise<void>;
}

export { ICreateUserDTO, IUserRepository };
