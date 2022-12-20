import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

interface DataLog {
  success: boolean;
  refreshToken: string;
  userId: number;
  ip: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findUserForLogin(find: string) {
    return this.prisma.user.findFirst({
      include: { pegawai: true, groupAkses: true },
      where: {
        OR: [{ username: find }, { email: find }, { pegawai: { kode: find } }],
      },
    });
  }
  async findByPublicId(publicId: string) {
    return this.prisma.user.findFirst({
      include: { pegawai: true, groupAkses: true },
      where: { publicId: publicId },
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { refreshToken: await argon2.hash(refreshToken) },
    });
  }

  async userAuthLog(data: DataLog) {
    const { success, refreshToken, userId, ip } = data;
    if (success) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: await argon2.hash(refreshToken) },
      });
    }

    await this.prisma.authLog.create({
      data: {
        status: success,
        userId,
        ip,
      },
    });
  }
}
