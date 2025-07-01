import { Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetShippersDto } from './dto/get-shippes.dto';
import { Shippers } from '@prisma/client'

@Injectable()
export class ShippersService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateShipperDto): Promise<Shippers> {
    return this.prisma.shippers.create({
      data,
    });
  }

  async findAll(dto: GetShippersDto): Promise<{ shippers: Partial<Shippers>[], totalShippers: number, totalPages: number }> {
    const args: any = {};
    if (dto.take) {
      args.skip = dto.page ? (dto.page - 1) * dto.take : 0;
      args.take = dto.take;
    }

    const shippers = await this.prisma.categories.findMany(args);
    const totalShippers = await this.prisma.categories.count();
    return {
      shippers,
      totalShippers,
      totalPages: dto.take ? Math.ceil(totalShippers / dto.take) : 0,
    };
  }

  findOne(id: number): Promise<Shippers | null> {
    return this.prisma.shippers.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateShipperDto): Promise<Shippers> {
    return this.prisma.shippers.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number): Promise<Shippers> {
    return this.prisma.shippers.delete({
      where: { id },
    });
  }
}
