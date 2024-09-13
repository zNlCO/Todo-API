import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class TodoAddDTO {
    @Type(() => String)
    title: string;
    @IsDate()
    dueDate: Date;
}