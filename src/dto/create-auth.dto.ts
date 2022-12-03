import { IsInt, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly token: string;
}

export class LoginAuthDto {
  @IsString()
  readonly token: string;
}

export class UpdateAuthDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly avatar: string;
}
