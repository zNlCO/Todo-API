import { plainToClass } from "class-transformer";
import { validate as classValidate } from "class-validator";
import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../errors/validation";

export const validate = <T extends object>(type: (new() => T), origin: 'body' | 'query' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = plainToClass(type, req[origin]);
    const errors = await classValidate(data);

    if (errors.length > 0) {
      next(new ValidationError(errors));
    } else {
      next();
    }
  }
}
