import { container } from "tsyringe";
import { UpdateUserAvatarUserCase } from "./UpdateUserAvatarUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import type { Request, Response } from "express";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = response.locals.userId;
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
