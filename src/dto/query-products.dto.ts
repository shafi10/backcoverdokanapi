import { IsInt, IsString } from 'class-validator';

export class GetProductsQuery {
  @IsString()
  readonly limit: string;
}

export class GetProductsQueryDto {
  @IsString()
  readonly skip: string;

  @IsString()
  readonly limit: string;
}

export class GetProductsSearchQueryDto {
  @IsString()
  readonly skip: string;

  @IsString()
  readonly limit: string;

  @IsString()
  readonly q: string;
}
