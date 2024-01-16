import { ArrayNotEmpty, IsArray, IsDefined } from 'class-validator'
import { Expose } from 'class-transformer'


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
  @IsArray()
  @IsArray({ each: true })
  @ArrayNotEmpty()
  values: number[][]
}
