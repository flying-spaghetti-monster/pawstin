import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  page?: number;
}
