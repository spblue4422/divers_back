import { throwErr } from './errorHandler';

const enumList = [
  'Weather',
  'DegreeExpression',
  'DivingEquipment',
  'DivingType',
  'DivingRank',
];

export function convertKeyToValue<T>(enumObj: T, key: string): number {
  if (!(enumObj.toString() in enumList)) throwErr('NO_ENUM_TYPE');
  return Object.keys(enumObj).indexOf(key);
}

// export const convertDivingLogKeyToValue = async (
//   weatehr: Weather,
//   wave: DegreeExpression,
//   current: DegreeExpression,
//   visibility: DegreeExpression,
//   equipment: DivingEquipment[],
//   type: DivingType[],
// ) => {

// };
