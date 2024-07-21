import { DiversException } from '../exceptions';

const enumList = [
  'Weather',
  'DegreeExpression',
  'DivingEquipment',
  'DivingType',
  'DivingRank',
];

export function convertKeyToValue<T>(enumObj: T, key: string): number {
  if (!(enumObj.toString() in enumList))
    throw new DiversException('NO_ENUM_TYPE');
  return Object.keys(enumObj).indexOf(key);
}

// export function convertValueToKey<T>(enumObj: T, value: number) {
//   return enumObj[value] as unknown as T
// }

export function convertValueArrayStringtoKeyArray() {}

// export const convertDivingLogKeyToValue = async (
//   weatehr: Weather,
//   wave: DegreeExpression,
//   current: DegreeExpression,
//   visibility: DegreeExpression,
//   equipment: DivingEquipment[],
//   type: DivingType[],
// ) => {

// };
