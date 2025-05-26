import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async createUser(dto: CreateAuthDto) {
    const salt = await genSalt(10);

    const newUser = await this.prisma.customers.create({
      data: {
        email: dto.email,
        password: await hash(dto.password, salt),
        first_name: dto.first_name,
        last_name: dto.last_name,
        role: dto.role || 'USER',
      },
    });

    return newUser;
  }

  async findUser(email: string) {
    return this.prisma.customers.findUnique({
      where: {
        email: email,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCorrectPassword = await compare(password, user.password);

    console.log(password === user.password);
    console.log(typeof password);
    console.log(typeof user.password);
    console.log(isCorrectPassword);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    return user;
  }

  async login(email: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
