import mongoose, { Schema } from "mongoose";
import { Todo } from "./todo.entity";

//per mongoDB
//i due boolean nell'input saranno settati di default
const todoSchema = new Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: Boolean,
  createdBy: { type: Schema.Types.ObjectId, ref: "User"},
  assignTo: { type: Schema.Types.ObjectId, ref: "User"}
});

todoSchema.virtual('expired').get(function() {
  return this.dueDate! < new Date() && this.completed === false;
})

todoSchema.set('toJSON', {
    virtuals: true,
    //se il set va a buon fine chiama questa funzione
    //per poter trasformare il return
    transform: (_, ret) => {
        //tolgo l'id di mongo dato che non mi serve nell'entity
        delete ret._id;
        delete ret.__v;
        delete ret.createdBy;
        delete ret.assignTo;
        return ret;
    }
  });

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema);