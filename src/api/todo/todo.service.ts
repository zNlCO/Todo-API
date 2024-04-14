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

    async update(id: string): Promise<Todo> {
    
        const filter = { id: id };
        const update = { completed: true };
        
        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        const updTodo = await TodoModel.findOneAndUpdate(filter, update, {
          new: true
        });

        return updTodo;
      }
    
}

export default new TodoService();