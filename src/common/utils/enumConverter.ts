import { DiversException } from '../exceptions';

export function convertKeyToValue<T>(enumObj: T, key: string): number {
  if (!enumObj[key]) {
    console.log(enumObj, key);
    console.log(enumObj[key]);
    throw new DiversException('NO_ENUM_TYPE');
  }
  return enumObj[key];
}

export function convertValueArrayStringtoKeyArray() {}
