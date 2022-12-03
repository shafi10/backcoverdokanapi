import { IsInt, IsString } from 'class-validator';

export class AddressDto {
  @IsInt()
  readonly address_name: string;

  @IsString()
  readonly address: string;

  @IsInt()
  readonly phone: string;
}

export class GetAddressQueryDto {
  @IsInt()
  readonly limit: number;
}
