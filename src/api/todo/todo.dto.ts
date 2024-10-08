import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsOptional } from "class-validator";

export class TodoAddDTO {
    @Type(() => String)
    title: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate: Date;

    @IsMongoId()
    @Type(() => String)
    assignTo: string;
}