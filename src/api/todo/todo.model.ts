import mongoose, { Schema } from "mongoose";
import { Todo } from "./todo.entity";

//per mongoDB
//i due boolean nell'input saranno settati di default
const todoSchema = new Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: Boolean,
  expired: Boolean
});

todoSchema.set('toJSON', {
    virtuals: true,
    //se il set va a buon fine chiama questa funzione
    //per poter trasformare il return
    transform: (_, ret) => {
        //tolgo l'id di mongo dato che non mi serve nell'entity
        delete ret._id;
        delete ret.__v;
        
        return ret;
    }
  });

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema);