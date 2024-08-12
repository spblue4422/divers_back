import { HttpException } from '@nestjs/common';

import { ErrorName, Errors } from '@/common/errors';

export class DiversException extends HttpException {
  constructor(errorName: ErrorName) {
    const { statusCode, errorCode, msg } = Errors[errorName.toString()];
    super(msg, statusCode);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.msg = msg;
  }

  statusCode: number;

  errorCode: number;

  msg: string;
}
