import { NotFoundError } from "../../errors/not-found";
import { Todo } from "./todo.entity";
import { TodoModel } from "./todo.model";

export class TodoService {

    async add (todo: Todo, userId: string): Promise<Todo> {
        //
        const newTodo = await TodoModel.create({...todo, userId});

        //ritorna il new todo
        return newTodo;
    }

    async list(showCompleted: Boolean, userId: string): Promise<Todo[]> {
      if(showCompleted) {
        return TodoModel.find({user: userId});
      }
      return TodoModel.find({completed: false, user: userId});
    }

    async update(id: string, varCompleted: Boolean, userId: string): Promise<Todo | null>  {
    
        const existing = await TodoModel.findOne({_id: id, user: userId});
        if (!existing) {
          throw new NotFoundError();
        }

        const filter = { _id: id, user: userId };
        const update = { completed: varCompleted };
    
        const updTodo = await TodoModel.findOneAndUpdate(filter, update, { new: true });
        
        return updTodo;
      }
    
}

export default new TodoService();