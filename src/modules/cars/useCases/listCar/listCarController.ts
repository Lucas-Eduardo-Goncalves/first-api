import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarUseCase } from "./listCarUseCase";

class ListCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarUseCase = container.resolve(ListCarUseCase);
    return response.json(await listCarUseCase.execute());
  }
}

export { ListCarController };
