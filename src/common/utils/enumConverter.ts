import {
  DegreeExpression,
  DivingEquipment,
  DivingRank,
  DivingType,
  RecommendationTarget,
  Weather,
} from '../enums';
import { throwErr } from './errorHandler';

export const convertKeyToValue = async (
  enumName: string,
  key: string,
): Promise<number> => {
  switch (enumName) {
    case 'RT':
      return Object.keys(RecommendationTarget).indexOf(key);

    case 'DR':
      return Object.keys(DivingRank).indexOf(key);

    case 'W':
      return Object.keys(Weather).indexOf(key);

    case 'DE':
      return Object.keys(DegreeExpression).indexOf(key);

    case 'E':
      return Object.keys(DivingEquipment).indexOf(key);

    case 'DT':
      return Object.keys(DivingType).indexOf(key);

    case 'DR':
      return Object.keys(DivingRank).indexOf(key);

    default:
      throwErr('NO_ENUM_TYPE');
  }
};

// export const convertValueToKey = (enumName: string, value: number) => {

// }
