import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAllBooks() {
    return await this.prisma.book.findMany();
  }

  async searchBooks(q?: string) {
    return await this.prisma.book.findMany({
      where: {
        OR: [
          {
            title: { contains: q },
          },
          {
            author: { contains: q },
          },
          {
            publisher: { contains: q },
          },
        ],
      },
    });
  }

  async findRandomBooks() {
    return await this.prisma.$queryRawUnsafe(
      `SELECT * FROM "Book" ORDER BY RANDOM() LIMIT 3;`,
    );
  }

  async findOneBook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });
    if (!book) {
      throw new NotFoundException(`${id}번 도서는 존재하지 않습니다`);
    }
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    return await this.prisma.book.update({
      where: {
        id: id,
      },
      data: updateBookDto,
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
