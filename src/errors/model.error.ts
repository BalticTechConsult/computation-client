import { ValidationError } from 'class-validator'


export class ModelError extends TypeError {
  errors: ValidationError[]

  constructor(message: string, errors: ValidationError[]) {
    super(message)

    this.name = 'ModelTypeError'
    this.message = message
    this.errors = errors
  }
}
