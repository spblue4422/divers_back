import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorForm, Errors } from '../errors';
import { HttpAdapterHost } from '@nestjs/core';
import { DiversException } from '../exceptions';

const handleError = (err): ErrorForm => {
  const { statusCode, errorCode, msg } = Object.keys(Errors).includes(
    err.message,
  )
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

    if (exception instanceof DiversException) {
      const { statusCode, errorCode, msg } = exception;
      const responseBody: ErrorForm = { statusCode, errorCode, msg };

      httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    } else {
      const responseBody: ErrorForm = handleError(exception);
      const { statusCode } = responseBody;

      httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
  }
}
