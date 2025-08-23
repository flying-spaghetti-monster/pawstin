import { Inject, Injectable, LoggerService, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { Customers, Roles } from '@prisma/client';

export interface JwtPayload {
  status: string,
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_CHANNEL') private channel,
    @Inject('Logger') private readonly logger: LoggerService,
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

  async login(user: Required<Pick<Customers, "email" | "id">>, isService?): Promise<JwtPayload> {
    let payload = {};

    if (!isService) {
      payload = { sub: user.id, username: user.email };
    } else {
      payload = { sub: 'google', username: user.email };
    }

    return {
      status: 'success',
      access_token: await this.jwtService.signAsync(payload),
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

  async saveResetToken(userId: number, token: string) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 хвилин TTL

    return this.prisma.passwordReset.create({
      data: { token, userId, expiresAt },
    });
  }

  async verifyResetToken(token: string) {
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!reset || reset.expiresAt < new Date()) {
      return null;
    }

    return reset.user;
  }

  async updatePassword(userId: number, newPassword: string) {
    const salt = await genSalt(10);
    const hashed = await hash(newPassword, salt);

    await this.prisma.customers.update({
      where: { id: userId },
      data: { password: hashed },
    });

    await this.prisma.passwordReset.deleteMany({
      where: { userId: userId },
    });

    return { success: true };
  }

  async logout(token: string) {
    // there will be remove token logic soon
    return { success: true };
  }

  sendEmail(user: Customers, options: {
    type: 'registration' | 'resetPassword',
    token?: string
  }) {
    const message = {
      type: options.type,
      to: user.email,
      name: user.first_name,
      token: options.token || null,
    };

    this.channel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    this.logger.log(`📨 Email task sent: ${JSON.stringify(message)}`);
  }
}
