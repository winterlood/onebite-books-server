import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: { ...createReviewDto, bookId: +createReviewDto.bookId },
    });
  }

  async findAllReviews() {
    return await this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBookReviews(bookId: number) {
    return await this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateReview(reviewId: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) {
      throw new NotFoundException(`${review}번 리뷰는 존재하지 않습니다`);
    }

    return await this.prisma.review.update({
      where: {
        id: +reviewId,
      },
      data: updateReviewDto,
    });
  }

  async removeReview(reviewId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) {
      throw new NotFoundException(`${reviewId}번 리뷰는 존재하지 않습니다`);
    }
    await this.prisma.review.delete({
      where: {
        id: +reviewId,
      },
    });
  }
}
