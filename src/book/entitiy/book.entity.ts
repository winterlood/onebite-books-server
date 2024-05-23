import { ApiProperty } from '@nestjs/swagger';

export class BookEntity {
  @ApiProperty({
    description: '아이디',
  })
  id: number;

  @ApiProperty({
    description: '도서 제목',
  })
  title: string;

  @ApiProperty({
    description: '도서 부제',
  })
  subTitle: string;

  @ApiProperty({
    description: '도서 소개',
  })
  description: string;

  @ApiProperty({
    description: '저자',
  })
  author: string;

  @ApiProperty({
    description: '출판사',
  })
  publisher: string;

  @ApiProperty({
    description: '도서 표지 이미지 URL',
  })
  coverImgUrl: string;
}
