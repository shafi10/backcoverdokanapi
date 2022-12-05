import { IsInt, IsString, IsBoolean, ValidateNested } from 'class-validator';

// class UnitPrice {
//   @IsInt()
//   readonly price: number;

//   @IsString()
//   readonly unit: string;

//   @IsInt()
//   readonly unit_size: number;
// }

class Gallery {
  @IsString()
  original: string;
}

export class CreateProductsDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly discount_type: string;

  @IsString()
  readonly generic_name: string;

  @IsBoolean()
  readonly is_available: boolean;

  @IsInt()
  readonly discount_value: number;

  @IsBoolean()
  readonly is_discountable: boolean;

  @IsString()
  readonly manufacturer_name: string;

  @IsString()
  readonly strength: string;

  @IsString()
  readonly slug: string;

  @IsInt()
  readonly price: number;

  // @ValidateNested()
  // readonly info: UnitPrice[];

  @ValidateNested()
  gallery: Gallery[];
}
