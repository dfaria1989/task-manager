import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.isValidAuth(username, password);
      
      if (!user) throw new UnauthorizedException();
      return user;
    } catch ({ message = 'Error in auth validation!' }) {
      throw new UnauthorizedException(message);
    }
  }
}
