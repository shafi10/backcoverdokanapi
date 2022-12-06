import { IsInt, IsString } from 'class-validator';

export class GetProductsQuery {
  @IsString()
  readonly limit: string;
}

export class GetProductsQueryDto {
  @IsInt()
  readonly skip: number;

  @IsInt()
  readonly limit: number;
}

export class GetProductsSearchQueryDto {
  @IsString()
  readonly skip: string;

  @IsString()
  readonly limit: string;

  @IsString()
  readonly q: string;
}
