export enum Weather {
  SUNNY = 0,
  CLOUDY = 1,
  RAINY = 2,
  FOGGY = 3,
  STORMY = 4,
  SNOWY = 5,
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
  LOW = 0,
  MIDDLE = 1,
  HIGH = 2,
}

export enum DivingType {
  'Boat',
  'Night',
  'Beach',
  'Sunset',
  'Cave',
  'Liveaboard',
}

export enum DivingEquipment {
  DIVE_COMP = 0,
  SMB = 1,
}

export enum DivingRank {
  NONE = 0,
  OPENWATER = 1,
  ADVANCED = 2,
  RESCUE = 3,
  INSTRUCTOR = 4,
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
  SHOP = 0,
  POINT = 1,
  SHOP_REVIEW = 2,
  POINT_REVIEW = 3,
}
