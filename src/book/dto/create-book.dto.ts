import { IsCustomUrl, IsNonEmptyString } from 'src/validate-decorators';

export class CreateBookDto {
  @IsNonEmptyString()
  title: string;

  @IsNonEmptyString()
  subTitle: string;

  @IsNonEmptyString()
  description: string;

  @IsNonEmptyString()
  author: string;

  @IsNonEmptyString()
  publisher: string;

  @IsCustomUrl()
  coverImgUrl: string;
}
