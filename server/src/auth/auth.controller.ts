import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, Get, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    //TODO: dto.remember_me
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async create(@Body() dto: CreateUserDto) {
    const oldUser = await this.authService.findUser(dto.email);

    if (oldUser) {
      return new HttpException(`User ${dto.email} alredy registered`, HttpStatus.BAD_REQUEST);
    }
    return await this.authService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUsers')
  async getUsers(@Query('page', ParseIntPipe) page: number) {
    return this.authService.getUsers(page);
  }

  //TODO: Implement these methods
  // logout
  //resetPassword / gmail sevice
}
