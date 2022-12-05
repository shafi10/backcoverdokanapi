import { IsInt, IsString } from 'class-validator';

export class BannerDto {
  @IsInt()
  readonly image: string;

  @IsString()
  readonly title: string;

  @IsInt()
  readonly description: string;
}

export class GetBannerQueryDto {
  @IsString()
  readonly limit: string;
}
