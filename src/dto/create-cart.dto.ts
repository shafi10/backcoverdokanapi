import { IsArray, IsInt, IsString, ArrayMinSize } from 'class-validator';

export class CartDto {
  // @IsArray()
  // @IsString({ each: true })
  // @ArrayMinSize(1)
  // readonly cartIds: string[];
  @IsString()
  readonly productId: string;

  @IsInt()
  readonly quantity: number;

  @IsInt()
  readonly unit: string;
}
