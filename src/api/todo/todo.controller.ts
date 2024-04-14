import { NextFunction, Request, Response } from "express";
import { Todo } from "./todo.entity";
import todoService from "./todo.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await todoService.list();
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

      var varDate = new Date(dueDate);
      var today = new Date();
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

  