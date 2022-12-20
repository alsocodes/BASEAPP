import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserForLogin(username);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const { accessToken, refreshToken } = await this.generateToken({
      username: user.username,
      sub: user.publicId,
      accesses: [...user.listAkses, ...user.groupAkses?.listAkses],
    });

    // TODO: get IP login
    await this.usersService.userAuthLog({
      success: true,
      ip: null,
      refreshToken,
      userId: user.id,
    });

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
      user: {
        id: user.publicId,
        username: user.username,
        name: user.pegawai.nama,
        accesses: [...user.listAkses, ...user.groupAkses?.listAkses],
      },
    };
  }

  async generateToken(data: any) {
    const {
      access_token_expires,
      access_token_secret,
      refresh_token_expires,
      refresh_token_secret,
    } = jwtConstants;

    const accessToken = this.jwtService.sign(
      {
        ...data,
      },
      {
        secret: access_token_secret,
        expiresIn: access_token_expires,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: data.sub,
      },
      {
        secret: refresh_token_secret,
        expiresIn: refresh_token_expires,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshLogin(userId: string, refreshToken: string) {
    const user = await this.usersService.findByPublicId(userId);
    if (!user || !user.refreshToken) throw new UnauthorizedException('Access Denied');

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

    if (!refreshTokenMatches) throw new UnauthorizedException('Access Denied');

    // return { refreshTokenMatches, refreshToken };
    const tokens = await this.generateToken({
      username: user.username,
      sub: user.publicId,
      roles: [...user.listAkses, ...user.groupAkses?.listAkses],
    });

    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      user: {
        id: user.publicId,
        username: user.username,
        name: user.pegawai.nama,
        roles: [...user.listAkses, ...user.groupAkses?.listAkses],
      },
    };
  }
}
