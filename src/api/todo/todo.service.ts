import { Todo } from "./todo.entity";
import { TodoModel } from "./todo.model";

export class TodoService {

    async add (todo: Todo): Promise<Todo> {
        //
        const newTodo = await TodoModel.create(todo);

        //ritorna il new todo
        return newTodo;
    }

    async list(showCompleted: Boolean): Promise<Todo[]> {
      console.log(showCompleted);

      if(showCompleted) {
        return TodoModel.find();
      }
      return TodoModel.find({completed: false});
    }

    async update(id: string, varCompleted: Boolean): Promise<Todo | null>  {
    
        const filter = { _id: id };
        const update = { completed: varCompleted };
    
        const updTodo = await TodoModel.findOneAndUpdate(filter, update, { new: true });
        
        
        const existing = await TodoModel.findById(id);
        if (!existing) {
          //throw new NotFoundError();
        }

        return updTodo;
      }
    
}

export default new TodoService();