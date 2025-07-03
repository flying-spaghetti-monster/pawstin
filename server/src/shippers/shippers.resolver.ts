import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippersService } from './shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { GetShippersDto } from './dto/get-shippes.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// Импортируйте сущность Shipper, если она есть в GraphQL schema
// import { Shipper } from './entities/shipper.entity';

@Resolver('Shipper')
export class ShippersResolver {
  constructor(private readonly shippersService: ShippersService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createShipper(@Args('createShipperDto') createShipperDto: CreateShipperDto) {
    await this.shippersService.create(createShipperDto);
    return true;
  }

  @Query(() => [Object], { name: 'shippers' })
  async findAll(@Args('dto', { type: () => GetShippersDto, nullable: true }) dto: GetShippersDto) {
    return this.shippersService.findAll(dto);
  }

  @Query(() => Object, { name: 'shipper' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateShipper(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateShipperDto') updateShipperDto: UpdateShipperDto,
  ) {
    await this.shippersService.update(id, updateShipperDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeShipper(@Args('id', { type: () => Int }) id: number) {
    await this.shippersService.remove(id);
    return true;
  }
}
