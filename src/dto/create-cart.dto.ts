import { IsInt, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  readonly productId: string;

  @IsInt()
  readonly quantity: number;

  // @IsInt()
  // readonly unit: string;
}
