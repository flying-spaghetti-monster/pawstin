import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, Get, Query, ParseIntPipe, UseGuards, Req, Res, Inject, LoggerService } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { Customers } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { LoggerModule } from 'src/Logger/loger.module';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('Logger') private readonly logger: LoggerService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Returns an object with status and access_token fields'
  })
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid credentials: ' + HttpStatus.UNAUTHORIZED })
  async login(@Body() dto: LoginUserDto) {
    //TODO: dto.remember_me
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async create(@Body() dto: CreateUserDto) {
    const oldUser = await this.authService.findUser(dto.email);

    if (oldUser) {
      return new HttpException(`User ${dto.email} alredy registered`, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.authService.createUser(dto);

    this.authService.sendEmail(newUser, { type: 'registration' });

    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUsers')
  async getUsers(@Query('page', ParseIntPipe) page: number) {
    return this.authService.getUsers(page);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth2 login process
    return { message: 'Google authentication initiated' };
  }

  //TODO update DB to save user data from google without password, add field like isServiceAuth
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log(req.user)
    let result = await this.authService.login(req.user, true);
    return res.redirect(`http://localhost:5173/login/success?token=${result.access_token}`);
  }

  @Post('reset-password-request')
  async resetPasswordRequest(@Body('email') email: string) {
    const user = await this.authService.findUser(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = uuid();

    await this.authService.saveResetToken(user.id, token);

    this.authService.sendEmail(user, { type: 'resetPassword', token });

    return { message: 'Reset password email sent' };
  }

  @Post('reset-password-confirm')
  async resetPasswordConfirm(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.authService.verifyResetToken(token);

    if (!user) {
      this.logger.error(`Invalid or expired token: ${token}`)
      throw new HttpException(`Invalid or expired token: ${token}`, HttpStatus.BAD_REQUEST);
    }

    await this.authService.updatePassword(user.id, newPassword);

    return { message: 'Password successfully updated' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return { message: 'No token provided' };
    }

    await this.authService.logout(token);

    return { message: 'Logout successful' };
  }

}
