export type ErrorType = {
  statusCode: number;
  errorCode: number;
  msg: string;
};

export type ErrorMsg = keyof typeof Errors;

export const Errors = {
  UNREGISTERED_CODE: {
    statusCode: 500,
    errorCode: -999,
    msg: '등록되지 않은 에러 코드',
  },
  INTERNEL_SERVER_ERROR: {
    statusCode: 500,
    errorCode: 0,
    msg: '서버 에러',
  },
  NO_USER: {
    statusCode: 404,
    errorCode: 1000,
    msg: '존재하지 않는 사용자입니다.',
  },
  NO_SHOP: {
    statusCode: 404,
    errorCode: 1001,
    msg: '존재하지 않는 샵입니다.',
  },
  NO_POINT: {
    statusCode: 404,
    errorCode: 1002,
    msg: '존재하지 않는 포인트입니다.',
  },
  NO_DIVELOG: {
    statusCode: 404,
    errorCode: 1003,
    msg: '존재하지 않는 로그입니다.',
  },
  NO_SHOP_REVIEW: {
    statusCode: 404,
    errorCode: 1004,
    msg: '존재하지 않는 샵 리뷰입니다.',
  },
  NO_POINT_REVIEW: {
    statusCode: 404,
    errorCode: 1005,
    msg: '존재하지 않는 포인트 리뷰입니다.',
  },
  DUPLICATE_LOGIN_ID: {
    statusCode: 400,
    errorCode: 1100,
    msg: '이미 사용중인 아이디입니다.',
  },
  DUPLICATE_NICKNAME: {
    statusCode: 400,
    errorCode: 1101,
    msg: '이미 사용중인 닉네임입니다.',
  },
  DUPLICATE_PHONENUM: {
    statusCode: 400,
    errorCode: 1102,
    msg: '이미 인증된 전화번호입니다.',
  },
  DUPLICATE_EMAIL: {
    statusCode: 400,
    errorCode: 1103,
    msg: '이미 인증된 이메일입니다.',
  },
};
