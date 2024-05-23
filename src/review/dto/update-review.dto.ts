import { IsNonEmptyString } from 'src/validate-decorators';

export class UpdateReviewDto {
  @IsNonEmptyString()
  content: string;
}
