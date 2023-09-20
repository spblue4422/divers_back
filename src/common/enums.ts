export enum Weather {
  'Sunny',
  'Cloudy',
  'Rainy',
  'Foggy',
  'Stormy',
  'Snowy',
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
  'High',
  'Middle',
  'Low',
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
  'Dive Comp',
  'SMB',
}

export type DivingRank =
  | 'None'
  | 'OpenWater'
  | 'Advanced'
  | 'Rescue'
  | 'Instructor';

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
