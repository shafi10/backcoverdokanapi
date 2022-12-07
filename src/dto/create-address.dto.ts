import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  readonly address_name: string;

  @IsString()
  readonly address: string;
  @IsString()
  readonly phone: string;
}

export class GetAddressQueryDto {
  @IsString()
  readonly limit: string;
}
