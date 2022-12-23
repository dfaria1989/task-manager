import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = host.switchToHttp().getResponse();
    const message: string = (exception as TypeORMError).message;

    response.status(status).json({
      statusCode: status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      message: message,
      error: 'HttpException',
    });
  }
}
