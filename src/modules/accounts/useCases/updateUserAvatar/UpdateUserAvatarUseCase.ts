import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../repositories/IUserRepositories";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute(props: IRequest) {
    const user = await this.usersRepository.findById(props.user_id);
    if (!user) return new AppError("User is not exists.", 400);

    if (user.avatar) {
      await deleteFile("./tmp/avatar/" + user.avatar);
    }

    await this.usersRepository.update({
      ...user,
      avatar: props.avatar_file,
    });
  }
}

export { UpdateUserAvatarUserCase };
