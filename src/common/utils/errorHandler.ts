import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ErrorForm, Errors } from '@/common/errors';
import { DiversException } from '@/common/exceptions';

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

    console.log(exception);

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
