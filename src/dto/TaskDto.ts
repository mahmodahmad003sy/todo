import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(3, 255)
  title!: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(["new", "in progress", "completed"])
  status!: "new" | "in progress" | "completed";
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 255, { message: "Title must be between 3 and 255 characters" })
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(["new", "in progress", "completed"], {
    message: "Status must be either 'new''in progress' or 'completed'",
  })
  status?: string;
}
