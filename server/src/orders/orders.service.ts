import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { Orders } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateOrderDto) {
    //TODO: implement logic
    // return this.prisma.orders.create({
    //   data
    // });
  }

  async findAll(dto: GetOrdersDto): Promise<{ orders: Partial<Orders>[], totalorders: number, totalPages: number }> {
    const args: any = {};
    if (dto.take) {
      args.skip = dto.page ? (dto.page - 1) * dto.take : 0;
      args.take = dto.take;
    }

    const orders = await this.prisma.products.findMany(args);
    const totalorders = await this.prisma.products.count();
    return {
      orders,
      totalorders,
      totalPages: dto.take ? Math.ceil(totalorders / dto.take) : 0,
    };
  }

  findOne(id: number): Promise<Orders | null> {
    return this.prisma.orders.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateOrderDto) {
    //TODO: implement logic
    // return this.prisma.orders.update({
    //   where: { id },
    //   data: data,
    // });
  }

  remove(id: number): Promise<Orders> {
    return this.prisma.orders.delete({
      where: { id },
    });
  }
}
