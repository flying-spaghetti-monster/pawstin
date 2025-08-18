import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, Get, Query, ParseIntPipe, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth2 login process
    return { message: 'Google authentication initiated' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log(req.user)
    let result = await this.authService.login(req.user.email, true);
    console.log(result)
    return res.redirect(`http://localhost:5173/login/success?token=${result.access_token}`);
  }

  // @Post('logout')
  // async signOut(@Request() request: ProtectedRequest): Promise<string> {
  //   // await this.authService.signOut(request.keystore);
  //   return 'Logout sucess';
  // }

  //TODO: Implement these methods
  // logout
  //resetPassword / gmail sevice
}
