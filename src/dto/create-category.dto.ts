import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsBoolean()
  readonly is_active: boolean;

  @IsBoolean()
  readonly is_visible: boolean;
}

export class GetCategoryQueryDto {
  @IsString()
  readonly limit: string;
}
