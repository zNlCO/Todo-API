import { Types } from "mongoose";

//per codice
export interface Todo {
    id?: string;
    title: string;
    dueDate?: Date;
    completed: Boolean;
    createdBy?: Types.ObjectId;
    assignTo?: Types.ObjectId;
}