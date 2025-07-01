import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetShippersDto } from './dto/get-shippes.dto';

@UseGuards(JwtAuthGuard)
@Controller('shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShipperDto: CreateShipperDto) {
    return this.shippersService.create(createShipperDto);
  }

  @Get('findAll')
  findAll(@Query() dto: GetShippersDto) {
    return this.shippersService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShipperDto: UpdateShipperDto) {
    return this.shippersService.update(id, updateShipperDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shippersService.remove(id);
  }
}
