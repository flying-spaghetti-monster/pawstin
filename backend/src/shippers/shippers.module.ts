import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShippersController],
  providers: [ShippersService],
})
export class ShippersModule { }
