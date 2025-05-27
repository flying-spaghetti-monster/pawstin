import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCategoryDto) {
    console.log('Creating:', data);
    return this.prisma.categories.create({
      data,
    });
  }

  async findAll(page: number = 1) {
    const categories = await this.prisma.categories.findMany({
      select: {
        id: true,
        category_name: true,
        description: true,
        isActive: true,
        picture: true,
        slug: true,
      },
      skip: (page - 1) * 6,
      take: 6,
    });

    const totalCategories = await this.prisma.categories.count();
    return {
      categories,
      totalCategories,
      totalPages: Math.ceil(totalCategories / 6),
    };
  }

  findOne(slug: string) {
    return this.prisma.categories.findUnique({
      where: { slug },
    });
  }

  update(slug: string, data: UpdateCategoryDto) {
    // return this.prisma.categories.update({
    //   where: { slug },
    //   data: {
    //     ...data

    //   },
    // });
  }

  remove(slug: string) {
    return this.prisma.categories.delete({
      where: { slug },
    });
  }
}
