import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { Roles } from '@prisma/client';

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
        role: dto.role || Roles.USER,
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

  async getUsers(page: number = 1) {
    const users = await this.prisma.customers.findMany({
      select: {
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        address: true,
        city: true,
        region: true,
        postal_code: true,
        country: true,
        phone: true,
        isActive: true,
      },
      skip: (page - 1) * 6,
      take: 6,
    });
    const totalUsers = await this.prisma.customers.count();
    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / 6),
    };
  }
}
