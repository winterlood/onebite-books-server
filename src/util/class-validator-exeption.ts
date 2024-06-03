import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ClassValidatorException extends BadRequestException {
  private formatedErrors: {
    property: string;
    errors: { [key: string]: string };
  }[];

  constructor(public validationErrors: ValidationError[]) {
    super();
    this.formatedErrors = validationErrors.map((error) => ({
      property: error.property,
      errors: error.constraints,
    }));
  }

  getResponse() {
    return {
      statusCode: 400,
      message: `${this.formatedErrors.map((error) => error.property).join(', ')}는 요청에 포함되지 않아야 합니다`,
      error: 'Bad Request',
    };
  }
}
