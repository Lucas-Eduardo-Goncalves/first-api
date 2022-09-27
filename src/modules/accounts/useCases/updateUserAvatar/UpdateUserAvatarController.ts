import { container } from "tsyringe";
import { UpdateUserAvatarUserCase } from "./UpdateUserAvatarUseCase";
import type { Request, Response } from "express";
import { AppError } from "../../../../errors/AppErrors";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const avatar_file = request.file?.filename;

    const updateUserAvatarUserCase = container.resolve(
      UpdateUserAvatarUserCase
    );

    if (!avatar_file) {
      throw new AppError("Avatar not sent.");
    }

    await updateUserAvatarUserCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
