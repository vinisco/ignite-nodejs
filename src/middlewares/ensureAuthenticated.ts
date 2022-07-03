import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "75215c28d69829adc061509f586249002ff6a422"
    ) as IPayload;
    next();

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
