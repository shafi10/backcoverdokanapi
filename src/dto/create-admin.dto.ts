import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class AdminUpdateDto {
  @IsString()
  readonly name: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly roles: string[];
}
