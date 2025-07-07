import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RegistrationResponse } from './dto/register-response.dto';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user.email);
  }

  @Mutation(() => RegistrationResponse, { name: 'registration' })
  async register(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Object, { name: 'getUsers' })
  async getUsers(@Args('page', ParseIntPipe) page: number) {
    return this.authService.getUsers(page);
  }
}
