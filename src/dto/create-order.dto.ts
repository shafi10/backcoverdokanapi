import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  readonly products: Products[];

  @IsString()
  readonly coupon_id: string;

  @IsString()
  readonly address_id: string;

  @IsString()
  readonly payment_method: string;
}

export class Products {
  @IsInt()
  readonly quantity: number;

  @IsString()
  readonly productId: string;

  @IsString()
  readonly unit: string;
}

export class UpdateOrder {
  @IsString()
  readonly orderStatus: string;
}
