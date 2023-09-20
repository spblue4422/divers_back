import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDiveRank implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return true;
  }
}
