import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2500)
  readonly summary: string;
  user: { id: number; };

}
