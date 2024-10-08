import { DiversException } from '@/common/exceptions';

export function convertKeyToValue<T>(enumObj: T, key: string): number {
  if (!enumObj[key]) {
    throw new DiversException('NO_ENUM_TYPE');
  }
  return enumObj[key];
}

export function convertValueArrayStringtoKeyArray() {}
