import { ArrayMinSize, IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly roles: string[];
}

export class AdminLoginDto {
 @IsString()
  readonly email: string;

  @IsInt()
  readonly password: string;
}