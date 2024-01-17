import { ValidationError } from 'class-validator'


export class ModelError extends TypeError {
  errors: ValidationError[]

  constructor(message: string, errors: ValidationError[]) {
    super(message)

    this.name = 'DocReaderTypeError'
    this.message = message
    this.errors = errors
  }
}
