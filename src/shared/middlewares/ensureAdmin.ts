import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppErrors";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const id = response.locals.userId;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user?.isAdmin) {
    throw new AppError("User is not admin!", 400);
  }

  return next();
}
