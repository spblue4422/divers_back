import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ErrorMsg, ErrorType, Errors } from '../errors';
import { HttpAdapterHost } from '@nestjs/core';

export const throwErr = async (code?: ErrorMsg) => {
  if (!code) throw Error('INTERNEL_SERVER_ERROR');
  throw Error(code);
};

const handleError = (err): ErrorType => {
  const { statusCode, errorCode, msg } =
    err.message in Object.keys(Errors)
      ? Errors[err.message]
      : Errors.UNREGISTERED_CODE;

  if (errorCode === -999) return Errors.UNREGISTERED_CODE;

  return {
    statusCode,
    errorCode,
    msg,
  };
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      const responseBody: Omit<ErrorType, 'errorCode'> = {
        statusCode: httpStatus,
        msg: exception.message,
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else {
      const responseBody = handleError(exception);
      const { statusCode: httpStatus } = responseBody;

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
