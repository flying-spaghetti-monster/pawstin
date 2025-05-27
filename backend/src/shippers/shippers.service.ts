import { Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShippersService {
  constructor(private readonly prisma: PrismaService) { }

  create(data) {
    console.log('Creating:', data);
    return this.prisma.shippers.create({
      data,
    });
  }

  async findAll(page: number = 1) {
    const shippers = await this.prisma.shippers.findMany({
      select: {
        id: true,
      },
      skip: (page - 1) * 6,
      take: 6,
    });

    const totalshippers = await this.prisma.shippers.count();
    return {
      shippers,
      totalshippers,
      totalPages: Math.ceil(totalshippers / 6),
    };
  }

  findOne(id: number) {
    return this.prisma.shippers.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateShipperDto) {
    return this.prisma.shippers.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.shippers.delete({
      where: { id },
    });
  }
}
