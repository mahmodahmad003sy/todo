import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";

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
