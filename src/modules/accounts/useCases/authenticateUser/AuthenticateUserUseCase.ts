import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";

import type { IUserRepository } from "../../repositories/IUserRepositories";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(props: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(props.email);
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(props.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "fe9cee841ee513c647796fa0019e498a", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
