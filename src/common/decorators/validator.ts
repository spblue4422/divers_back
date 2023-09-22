import {
  ValidationArguments,
  ValidationDecoratorOptions,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DivingRank } from '../assets/enums';

function CommonRegister(
  vdOptions?: Omit<ValidationDecoratorOptions, 'target' | 'propertyName'>,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: vdOptions.name,
      target: object.constructor,
      propertyName,
      options: vdOptions.options,
      constraints: vdOptions.constraints,
      validator: vdOptions.validator,
    });
  };
}

export function IsDiveRank(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return CommonRegister({
    name: 'IsDiveRank',
    options: validationOptions,
    constraints: [],
    validator: {
      validate: (value: any): boolean =>
        Object.values(DivingRank).includes(value) ? true : false,
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsLgoinId(validationOptions?: ValidationOptions) {}

export function IsPassword(validationOptions?: ValidationOptions) {}
