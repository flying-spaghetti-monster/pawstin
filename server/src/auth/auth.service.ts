import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { Customers, Roles } from '@prisma/client';

export interface JwtPayload {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async createUser(dto: CreateUserDto): Promise<Customers> {
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

  async findUser(email: string): Promise<Customers | null> {
    return this.prisma.customers.findUnique({
      where: {
        email: email,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<Customers> {
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

  async login(email: string): Promise<JwtPayload> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload,),
    };
  }

  async getUsers(page: number = 1): Promise<{ users: Partial<Customers>[], totalUsers: number, totalPages: number }> {
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
