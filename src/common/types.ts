import { FindOptionsWhere, ObjectId } from 'typeorm';

export type UpdateCriteria<T> =
  | string
  | number
  | Date
  | ObjectId
  | string[]
  | number[]
  | Date[]
  | ObjectId[]
  | FindOptionsWhere<T>;
