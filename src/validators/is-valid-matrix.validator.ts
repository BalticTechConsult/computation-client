import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'


/**
* Validator that checks if a value is a valid matrix.
*/
@ValidatorConstraint({ name: 'isValidMatrix' })
export class IsValidMatrix implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    // have to be an array
    if (!Array.isArray(value)) {
      return false
    }

    const length = value.length

    // have to be non-empty
    if (!length) {
      return false
    }

    for (let i = 0; i < length; i++) {
      // every element have to be an array
      if (!Array.isArray(value[i])) {
        return false
      }

      // have to be a square matrix
      if (value[i].length !== length) {
        return false
      }

      // every element have to be a number or null
      for (let j = 0; j < length; j++) {
        if (typeof value[i][j] !== 'number' && value[i][j] !== null) {
          return false
        }
      }

      // only one null element per row
      if (value[i].filter((el: number | null) => el === null).length > 1) {
        return false
      }
    }

    return true
  }
}
