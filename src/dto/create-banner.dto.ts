import { IsString } from 'class-validator';

export class BannerDto {
  @IsString()
  readonly image: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}

export class GetBannerQueryDto {
  @IsString()
  readonly limit: string;
}
