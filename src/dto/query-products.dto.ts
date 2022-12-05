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
  @IsInt()
  readonly skip: number;

  @IsInt()
  readonly limit: number;

  @IsString()
  readonly q: string;
}
