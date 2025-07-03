import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver('Order')
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createOrder(@Args('createOrderDto') createOrderDto: CreateOrderDto) {
    await this.ordersService.create(createOrderDto);
    return true;
  }

  @Query(() => [Object], { name: 'orders' })
  async findAll(@Args('dto', { type: () => GetOrdersDto, nullable: true }) dto: GetOrdersDto) {
    return this.ordersService.findAll(dto);
  }

  @Query(() => Object, { name: 'order' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOrderDto') updateOrderDto: UpdateOrderDto,
  ) {
    await this.ordersService.update(id, updateOrderDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeOrder(@Args('id', { type: () => Int }) id: number) {
    await this.ordersService.remove(id);
    return true;
  }
}
