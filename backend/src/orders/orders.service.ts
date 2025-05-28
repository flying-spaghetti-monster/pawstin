import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  create(data) {
    console.log('Creating:', data);
    return this.prisma.orders.create({
      data,
    });
  }

  async findAll(page: number = 1) {
    const orders = await this.prisma.orders.findMany({
      skip: (page - 1) * 6,
      take: 6,
    });

    const totalorders = await this.prisma.orders.count();
    return {
      orders,
      totalorders,
      totalPages: Math.ceil(totalorders / 6),
    };
  }

  findOne(id: number) {
    return this.prisma.orders.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateOrderDto) {
    return this.prisma.orders.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.orders.delete({
      where: { id },
    });
  }
}
