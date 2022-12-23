import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly password: string;
}
