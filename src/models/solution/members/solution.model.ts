import { Equals, IsArray, IsDefined, IsInt, IsString, validateSync } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'

import { Default } from '@/decorators'
import { ModelError } from '@/errors'
import { aSolution } from '../solution.abstract'
import { eSolutionType } from './consts'


/**
* Solution
*/
export interface iSolution extends aSolution {
  /**
  * Solution type
  * @type {eSolutionType.SOLUTION}
  */
  solutionType: eSolutionType.SOLUTION

  /**
  * Solution, array of routes
  * @type {number[][]}
  */
  solution: number[][]

  /**
  * Energy, less is better
  * @type {number}
  */
  energy: number

  /**
  * Algorithm name
  * @type {string}
  */
  algorithm: string
}

/**
* Computation result
*/
export class Solution implements iSolution {
  /**
  * Solution type
  * @type {eSolutionType.SOLUTION}
  */
  @Expose()
  @Equals(eSolutionType.SOLUTION)
  @Default(eSolutionType.SOLUTION)
  solutionType: eSolutionType.SOLUTION

  /**
  * Solution, array of routes
  * @type {number[][]}
  */
  @Expose()
  @IsDefined()
  @IsArray()
  solution: number[][]

  /**
  * Energy, less is better
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  energy: number

  /**
  * Algorithm name
  * @type {string}
  */
  @Expose()
  @IsDefined()
  @Default('unknown')
  @IsString()
  algorithm: string

  /**
  * Create Solution from plain object
  * @param {unknown} plain - plain object
  * @returns {Solution}
  * @internal
  */
  static fromPlain = (plain: unknown): Solution => plainToClass(Solution, plain)

  /**
  * Validate Solution
  * @param {Solution} input - Settings to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: Solution): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      throw new ModelError('Solution validation error!', errors)
    }

    return true
  }
}
