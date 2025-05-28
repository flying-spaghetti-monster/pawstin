import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  create(data) {
    console.log('Creating:', data);
    return this.prisma.products.create({
      data,
    });
  }

  async findAll(page: number = 1) {
    const products = await this.prisma.products.findMany({
      skip: (page - 1) * 6,
      take: 6,
    });

    const totalproducts = await this.prisma.products.count();
    return {
      products,
      totalproducts,
      totalPages: Math.ceil(totalproducts / 6),
    };
  }

  findOne(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.products.delete({
      where: { id },
    });
  }
}
