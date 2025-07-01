import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOrdersDto } from './dto/get-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateOrderDto) {
    //TODO: implement logic
    // return this.prisma.orders.create({
    //   data
    // });
  }

  async findAll(dto: GetOrdersDto) {
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
      totalPages: dto.take ? Math.ceil(totalorders / dto.take) : null,
    };
  }

  findOne(id: number) {
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

  remove(id: number) {
    return this.prisma.orders.delete({
      where: { id },
    });
  }
}
