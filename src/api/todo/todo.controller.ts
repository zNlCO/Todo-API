import { NextFunction, Request, Response } from "express";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service"; 
import { TodoAddDTO } from "./todo.dto";
import { TypedRequest } from "../../utils/typed-request.interface";

const todoService = new TodoService();

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
    const userId = req.user!.id;
    const checkCompleted = req.query.showCompleted === 'true';
    const todos = await todoService.list(checkCompleted, userId!);
    res.json(todos);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: TypedRequest<TodoAddDTO> , res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { title, dueDate, assignTo } = req.body;

    const completed = false;
    
    const newTodo: Todo = {
      title,
      completed,
      ...(dueDate ? { dueDate: new Date(dueDate) } : {})
    }

    const saved = await todoService.add(newTodo, user.id!, assignTo);
    
    res.json(saved).status(201);
    
  } catch(err) {
    next(err);
  }
}

export const checkCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { id } = req.params;

    const updated = await todoService.update(id, true);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const uncheckCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { id } = req.params;

    const updated = await todoService.update(id, false);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

