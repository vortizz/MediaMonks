import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(['ADMIN', 'USER'])
  login_type: string;
}
