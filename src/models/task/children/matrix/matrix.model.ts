import { ArrayNotEmpty, IsArray, IsDefined, IsInt, Validate, validateSync } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'

import { IsValidMatrix } from '@/validators'


/**
* Matrix.
*/
export interface iMatrix {
  /**
  * Matrix values.
  * Two-dimensional array of numbers.
  * Count of rows and columns must be equal.
  * @type {number[][]}
  */
  values: number[][]
}

/**
* Matrix.
*/
export class Matrix implements iMatrix {
  /**
  * Matrix values.
  * Two-dimensional array of numbers.
  * Count of rows and columns must be equal.
  * @type {number[][]}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  @IsArray()
  @IsArray({ each: true })
  @ArrayNotEmpty()
  @Validate(IsValidMatrix, { message: 'Matrix must be square and have at least one element, and every element must be a number or null!' })
  values: number[][]

  /**
  * Create Matrix from plain object
  * @param {unknown} plain - plain object
  * @returns {Matrix}
  * @internal
  */
  static fromPlain = (plain: unknown): Matrix => plainToClass(Matrix, plain)

  /**
  * Validate Matrix
  * @param {Matrix} input - Matrix to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: Matrix): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      console.error(errors)

      throw new TypeError('Matrix validation error!')
    }

    return true
  }
}
