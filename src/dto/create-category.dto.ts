import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CategoryDto {
  @IsInt()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsBoolean()
  readonly is_active: boolean;

  @IsBoolean()
  readonly is_visible: boolean;
}

export class GetCategoryQueryDto {
  @IsInt()
  readonly limit: number;
}
