export enum Weather {
  SUNNY = 1,
  CLOUDY = 2,
  RAINY = 3,
  FOGGY = 4,
  STORMY = 5,
  SNOWY = 6,
}

export enum JoinType {
  'New',
  'Kakao',
  'Google',
  'Naver',
  'Facebook',
  'Apple',
}

export enum DegreeExpression {
  LOW = 1,
  MIDDLE = 2,
  HIGH = 3,
}

export enum DivingType {
  BOAT = 1,
  NIGHT = 2,
  BEACH = 3,
  SUNSET = 4,
  CAVE = 5,
  LIVEABOARD = 6,
}

export enum DivingEquipment {
  DIVE_COMP = 1,
  SMB = 2,
}

export enum DivingRank {
  NONE = 1,
  OPENWATER = 2,
  ADVANCED = 3,
  RESCUE = 4,
  INSTRUCTOR = 5,
}

export enum SearchShop {
  'name',
  'country',
  'location',
}

export enum SearchPoint {
  'name',
  'country',
  'location',
}

export enum SearchUser {
  'nickname',
  'diveRank',
}

export enum SearchLog {
  'logNo',
  'buddy',
  'shop',
  'point',
  'diveDate',
  'divingType',
}

export enum RecommendationTarget {
  DIVESHOP = 1,
  DIVEPOINT = 2,
  DIVESHOP_REVIEW = 3,
  DIVEPOINT_REVIEW = 4,
}

export enum Role {
  USER = 100,
  SHOP = 200,
  ADMIN = 888,
}
