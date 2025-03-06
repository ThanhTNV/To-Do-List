import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsNotEmpty({ message: 'Completed is required' })
  @IsBoolean({ message: 'Completed must be a boolean' })
  completed: boolean;
}
