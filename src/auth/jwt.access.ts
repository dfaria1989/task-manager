import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConstantProviders } from 'src/config/constants.provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const secretData = request?.cookies[ConstantProviders[0]?.useValue?.JWT_TOKEN];
          return secretData?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      passReqToCallback: false,

    });
  }

  async validate(payload: any) {
    const { username } = payload;
    if (!username) throw new UnauthorizedException();
    return payload;
  }
}
