import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewEntity } from './entity/review.entity';

@ApiTags('Review (리뷰 관련 API)')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /*
   * GET
   */
  @Get('')
  @ApiExcludeEndpoint()
  findAllReviews() {
    return this.reviewService.findAllReviews();
  }

  @Get('/book/:bookId')
  @ApiOperation({
    summary: '도서의 리뷰 불러오기',
    description: '특정 도서의 리뷰를 모두 불러옵니다.',
  })
  @ApiParam({
    name: 'bookId',
    description: '리뷰를 불러오고 싶은 도서의 아이디',
    type: Number,
  })
  @ApiOkResponse({
    type: ReviewEntity,
    isArray: true,
  })
  findReviews(@Param('bookId') bookId: number) {
    return this.reviewService.findBookReviews(bookId);
  }

  /*
   * POST
   */
  @Post()
  @ApiOperation({
    summary: '새로운 리뷰 생성하기',
    description: '새로운 리뷰를 작성합니다',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookId: {
          type: 'number',
          description: '도서 ID',
        },
        content: {
          type: 'string',
          description: '리뷰 내용',
        },
        author: {
          type: 'string',
          description: '작성자',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: ReviewEntity,
    description: '생성된 리뷰를 반환합니다',
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  /*
   * PATCH
   */
  @Patch(':reviewId')
  @ApiOperation({
    summary: '리뷰 수정하기',
    description: '특정 리뷰를 수정합니다',
  })
  @ApiParam({
    name: 'reviewId',
    description: '수정하려는 리뷰의 아이디',
    type: Number,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: '리뷰 내용',
          nullable: true,
        },
        author: {
          type: 'string',
          description: '작성자',
          nullable: true,
        },
      },
    },
  })
  @ApiOkResponse({
    type: ReviewEntity,
    description: '수정된 리뷰를 반환합니다',
  })
  update(
    @Param('reviewId') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  /*
   * DELETE
   */
  @Delete(':reviewId')
  @ApiOperation({
    summary: '리뷰 삭제하기',
    description: '특정 리뷰를 삭제합니다',
  })
  @ApiParam({
    name: 'reviewId',
    description: '삭제하려는 리뷰의 아이디',
    type: Number,
  })
  @ApiOkResponse({
    description: '리뷰이 삭제되었습니다',
  })
  @ApiNotFoundResponse({
    description: '삭제하려는 리뷰이 존재하지 않습니다',
  })
  remove(@Param('reviewId') reviewId: number) {
    console.log(reviewId);
    return this.reviewService.removeReview(reviewId);
  }
}
