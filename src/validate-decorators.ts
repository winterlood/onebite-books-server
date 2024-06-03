import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import * as validator from 'validator';

export function IsNonEmptyString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNonEmptyString',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName}는 비어있지 않은 문자열이어야 합니다`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
}

export function IsCustomUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNonEmptyString',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName}는 URL 형태의 문자열이어야 합니다.`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validator.isURL(value);
        },
      },
    });
  };
}
