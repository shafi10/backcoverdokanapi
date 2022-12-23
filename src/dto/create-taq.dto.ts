import { IsBoolean, IsString } from 'class-validator';

export class TaqDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly is_active: boolean;
}

export class GetAllTaqQueryDto {
  @IsString()
  readonly skip: string;

  @IsString()
  readonly limit: string;
}
