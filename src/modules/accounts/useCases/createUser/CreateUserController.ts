import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import type { Request, Response } from "express";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
      avatar: null,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
