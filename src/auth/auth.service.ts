import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('JWT') private readonly jwt: any,
  ) {}

  private readonly logger = new Logger('AuthService');

  async isValidAuth(username: string, pass: string) {
    const data = await this.userService.findUserRole(username);
    if (data.length) {
      const { password, ...result } = data[0];
      if (!(await bcrypt.compare(pass, password))) {
        throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
      }
      return result;
    }
    throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
  }

  async jwtToken(user: any) {
    return {
      accessToken: await this.jwtService.signAsync(user),
    };
  }
  /**
   * set jwtToken + refreshToken
   */
  async authTokens(user, response: Response): Promise<void> {
    const accessTokenCookie = await this.jwtToken(user);
    if (!accessTokenCookie) throw new UnauthorizedException();

    this.setCookies({ accessTokenCookie }, response);
  }

  public removeCookies(response: Response): void {
    response.clearCookie(this.jwt.JWT_TOKEN);
    response.clearCookie(this.jwt.JWT_REFRESH_TOKEN);
  }

  protected setCookies({ accessTokenCookie }, response: Response): void {
    response.cookie(this.jwt.JWT_TOKEN, accessTokenCookie, { httpOnly: true });
  }
}
