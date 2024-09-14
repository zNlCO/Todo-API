import { NotFoundError } from "../../errors/not-found";
import { Todo } from "./todo.entity";
import { TodoModel } from "./todo.model";

export class TodoService {

    async add (todo: Todo, createdBy: string, assignTo: string): Promise<Todo> {
        const newTodo = await TodoModel.create({...todo, createdBy, assignTo});

        //ritorna il new todo
        return newTodo;
    }

    async list(showCompleted: Boolean, userId: string): Promise<Todo[]> {
      let ObjectId: any = require('mongoose').Types.ObjectId; 
      let query: any = { $or: [{ createdBy: new ObjectId(userId) }, { assignTo: new ObjectId(userId) }] };
      
      if(showCompleted) {
        return TodoModel.find(query);
      }
      return TodoModel.find({...query,completed: showCompleted});
    }

    async update(id: string, varCompleted: Boolean): Promise<Todo | null>  {
        const existing = await TodoModel.findOne({_id: id});
        if (!existing) {
          throw new NotFoundError();
        } 

        const filter = { _id: id };
        const update = { completed: varCompleted };
    
        const updTodo = await TodoModel.findOneAndUpdate(filter, update, { new: true });
        
        return updTodo;
      }
    
}

export default new TodoService();