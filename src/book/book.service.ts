import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/util/prisma-exclude';
import { removeWhitespace } from 'src/util/remove-whitepsace';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto) {
    const searchIndex = removeWhitespace([
      createBookDto.title,
      createBookDto.author,
      createBookDto.subTitle,
    ]);

    return await this.prisma.book.create({
      data: { ...createBookDto, searchIndex },
      select: prismaExclude('Book', ['searchIndex']),
    });
  }

  async findAllBooks() {
    return await this.prisma.book.findMany({
      select: prismaExclude('Book', ['searchIndex']),
    });
  }

  async searchBooks(q?: string) {
    const searchText = q.replace(/\s+/g, '');
    return await this.prisma.book.findMany({
      select: prismaExclude('Book', ['searchIndex']),
      where: {
        OR: [
          {
            searchIndex: { contains: searchText, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  async findRandomBooks() {
    const query = `
    SELECT id, title, "subTitle", description, author, publisher, "coverImgUrl" 
    FROM "Book" ORDER BY RANDOM() LIMIT 3
    `;
    return await this.prisma.$queryRawUnsafe(query);
  }

  async findOneBook(id: number) {
    const book = await this.prisma.book.findUnique({
      select: prismaExclude('Book', ['searchIndex']),
      where: {
        id: id,
      },
    });
    if (!book) {
      throw new NotFoundException(`${id}번 도서는 존재하지 않습니다`);
    }
    return book;
  }

  async updateBook(id: number, dto: UpdateBookDto) {
    const beforeUpdateData = await this.prisma.book
      .findUnique({
        select: prismaExclude('Book', ['searchIndex']),
        where: {
          id: id,
        },
      })
      .catch((err) => console.log(err));

    if (!beforeUpdateData) {
      throw new NotFoundException(`${id}번 도서는 존재하지 않습니다`);
    }

    const searchIndex = removeWhitespace([
      dto.title ?? beforeUpdateData.title,
      dto.author ?? beforeUpdateData.author,
      dto.subTitle ?? beforeUpdateData.subTitle,
    ]);

    return await this.prisma.book.update({
      select: prismaExclude('Book', ['searchIndex']),
      where: {
        id: id,
      },
      data: { ...dto, searchIndex },
    });
  }

  async removeBook(id: number) {
    await this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }
}
