import {
  Controller,
  Post,
  Res,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('AuthController');

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    try {
      console.log("ddd")
      await this.authService.authTokens(req?.user, response);
      return { message: 'success' };
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Error in login!');
    }
  }
}
