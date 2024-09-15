import { NextFunction, Response, Request } from "express";
import userService from "./user.service";

export const me = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(req.user!);
}

export const fetch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.list(req.user!.id!);
    res.json(users);
  } catch(err) {
    next(err);
  }
}