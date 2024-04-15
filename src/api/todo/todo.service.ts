import { Todo } from "./todo.entity";
import { TodoModel } from "./todo.model";

export class TodoService {

    async add (todo: Todo): Promise<Todo> {
        //
        const newTodo = await TodoModel.create(todo);

        //ritorna il new todo
        return newTodo;
    }

    async list(): Promise<Todo[]> {
        return TodoModel.find();
    }

    async update(id: string)  {
    
        const filter = { id: id };
        const update = { completed: true };
    
        //new true per ritornare il document
        const updTodo = await TodoModel.findOneAndUpdate(filter, update);
        
        /*
        const existing = await TodoModel.findById(id);
        if (!existing) {
          throw new NotFoundError();
        }

        Object.assign(existing, {completed: true});
        await existing.save();
        const updated = await this.getById(id);
        return updated!;
        */

        return "fatto";
      }
    
}

export default new TodoService();