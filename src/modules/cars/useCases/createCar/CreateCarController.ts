import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";
import type { Request, Response } from "express";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    await createCarUseCase.execute({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return response.status(201).send();
  }
}

export { CreateCarController };
