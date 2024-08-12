import {
  ValidationArguments,
  ValidationDecoratorOptions,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import {
  DegreeExpression,
  DivingEquipment,
  DivingRank,
  DivingType,
  Weather,
} from '@/common/enums';

// 나중에 registerDecorator에 대해 한번 정리해보자
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
        Object.values(DivingRank).includes(value),
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsWeather(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return CommonRegister({
    name: 'IsWeather',
    options: validationOptions,
    constraints: [],
    validator: {
      validate: (value: any): boolean => Object.values(Weather).includes(value),
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsDegreeExpression(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return CommonRegister({
    name: 'IsDegreeExpression',
    options: validationOptions,
    constraints: [],
    validator: {
      validate: (value: any): boolean =>
        Object.values(DegreeExpression).includes(value),
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsEquipmentArray(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return CommonRegister({
    name: 'IsEquipmentArray',
    options: validationOptions,
    constraints: [],
    validator: {
      validate: (values: Array<any>): boolean =>
        !values
          .map((value) => Object.values(DivingEquipment).includes(value))
          .includes(false),
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsDivingTypeArray(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return CommonRegister({
    name: 'IsDivingTypeArray',
    options: validationOptions,
    constraints: [],
    validator: {
      validate: (values: Array<any>): boolean =>
        !values
          .map((value) => Object.values(DivingType).includes(value))
          .includes(false),
      defaultMessage: (args: ValidationArguments) =>
        `Validation Error: ${args.targetName}.${args.property} - ${args.value}`,
    },
  });
}

export function IsLoginId(validationOptions?: ValidationOptions) {}

export function IsPassword(validationOptions?: ValidationOptions) {}
