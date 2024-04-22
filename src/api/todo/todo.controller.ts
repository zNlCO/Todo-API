import { NextFunction, Request, Response } from "express";
import { Todo } from "./todo.entity";
import todoService from "./todo.service";
import { TodoQueryDTO } from "./todo.dto";
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
    const checkCompleted = req.query.showCompleted === 'true';
    const todos = await todoService.list(checkCompleted);
    res.json(todos);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, dueDate } = req.body;
    
    const completed = false;
    let expired = false;

    const varDate = new Date(dueDate);
    const today = new Date();
    if(varDate < today ) {
      expired = true;
    }

    
    const newTodo: Todo = {
      title,
      dueDate,
      completed,
      expired
    }

    const saved = await todoService.add(newTodo);
    //
    res.json(saved);
  } catch(err) {
    next(err);
  }
}

export const checkCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updated = await todoService.update(id, true);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const uncheckCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updated = await todoService.update(id, false);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

