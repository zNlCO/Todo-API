import { NextFunction, Request, Response } from "express";
import { Todo } from "./todo.entity";
import todoService from "./todo.service";
import { TodoAddDTO } from "./todo.dto";
import { TypedRequest } from "../../utils/typed-request.interface";

/*
export const list = async (req: TypedRequest<unknown, TodoQueryDTO>, res: Response, next: NextFunction) => {
  try {
    const todos = await todoService.list(req.query);
    res.json(todos);
  } catch(err) {
    next(err);
  }
}
*/

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const checkCompleted = req.query.showCompleted === 'true';
    const todos = await todoService.list(checkCompleted, user.id!);
    res.json(todos);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: TypedRequest<TodoAddDTO> , res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { title, dueDate } = req.body;
    
    const completed = false;
    
    const newTodo: Todo = {
      title,
      dueDate,
      completed
    }

    const saved = await todoService.add(newTodo, user.id!);
    
    res.json(saved).status(201);
    
  } catch(err) {
    next(err);
  }
}

export const checkCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { id } = req.params;

    const updated = await todoService.update(id, true, user.id!);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const uncheckCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { id } = req.params;

    const updated = await todoService.update(id, false, user.id!);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

