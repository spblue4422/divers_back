export type ErrorForm = {
  statusCode: number;
  errorCode: number;
  msg: string;
};

export type ErrorName = keyof typeof Errors;

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
  NO_ENUM_TYPE: {
    statusCode: 500,
    errorCode: -100,
    msg: '존재하지 않는 enum입니다',
  },
  AWS_S3_ERROR: {
    statusCode: 500,
    errorCode: 100,
    msg: 'AWS S3 요청 에러',
  },
  NO_AUTH: {
    statusCode: 404,
    errorCode: 999,
    msg: '존재하지 않는 계정입니다.',
  },
  NO_USER: {
    statusCode: 404,
    errorCode: 1000,
    msg: '존재하지 않는 사용자입니다.',
  },
  NO_DIVESHOP: {
    statusCode: 404,
    errorCode: 1001,
    msg: '존재하지 않는 샵입니다.',
  },
  NO_DIVEPOINT: {
    statusCode: 404,
    errorCode: 1002,
    msg: '존재하지 않는 포인트입니다.',
  },
  NO_DIVELOG: {
    statusCode: 404,
    errorCode: 1003,
    msg: '존재하지 않는 로그입니다.',
  },
  NO_DIVESHOP_REVIEW: {
    statusCode: 404,
    errorCode: 1004,
    msg: '존재하지 않는 샵 리뷰입니다.',
  },
  NO_DIVEPOINT_REVIEW: {
    statusCode: 404,
    errorCode: 1005,
    msg: '존재하지 않는 포인트 리뷰입니다.',
  },
  NO_CERT_APPLY: {
    statusCode: 404,
    errorCode: 1006,
    msg: '존재하지 않는 인증 신청입니다.',
  },
  NO_COUNTRY: {
    statusCode: 404,
    errorCode: 1007,
    msg: '존재하지 않는 국가입니다.',
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
  ALREADY_APPLIED_DIVESHOP: {
    statusCode: 400,
    errorCode: 1150,
    msg: '이미 심사중인 인증 신청이 존재합니다.',
  },
  REJECTED_THREE_TIMES_DIVESHOP: {
    statausCode: 400,
    errorCode: 1151,
    msg: '인증이 3번 이상 반려당한 샵입니다.',
  },
  NO_ACCESS_PRIVATE_DIVELOG: {
    statusCode: 403,
    errorCode: 1200,
    msg: '공개되어 있지 않은 로그입니다.',
  },
  BLOCKED_DIVELOG: {
    statusCode: 403,
    errorCode: 1250,
    msg: '블락된 로그입니다.',
  },
  UNAUTHORIZED_USER: {
    statusCode: 402,
    errorCode: 1300,
    msg: '인증되지 않은 이용자입니다.',
  },
  NO_ACCESSTOKEN: {
    statusCode: 402,
    errorCode: 1301,
    msg: '액세스 토큰이 존재하지 않습니다.',
  },
  NO_REFRESHTOKEN: {
    statusCode: 402,
    erroCode: 1302,
    msg: '리프레쉬 토큰이 존재하지 않습니다.',
  },
  WRONG_ID_PW: {
    statusCode: 402,
    errorCode: 1303,
    msg: '잘못된 ID/PW입니다.',
  },
  EXPIRED_TOKEN: {
    statusCode: 402,
    errorCode: 1304,
    msg: '만료된 토큰입니다.',
  },
  INVALID_LOGIN: {
    statusCode: 402,
    errorCode: 1305,
    msg: '유효하지 않은 로그인 정보입니다.',
  },
  INVALID_TOKEN: {
    statusCode: 402,
    errorCode: 1306,
    msg: '유효하지 않은 토큰입니다.',
  },
  BANNED_USER: {
    statusCode: 402,
    errorCode: 1307,
    msg: '밴 당한 계정입니다.',
  },
  NO_PERMISSION: {
    statusCode: 402,
    errorCode: 1308,
    msg: '이용 권한이 없습니다.',
  },
};
