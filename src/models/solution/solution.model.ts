import { Equals, IsArray, IsDefined, IsInt, IsString } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'

import { Default } from '@/decorators'


/**
* Computation result
*/
export interface iSolution {
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

  /**
  * Computation result version
  * @type {number}
  */
  version: 1
}

/**
* Computation result
*/
export class Solution implements iSolution {
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
  * Computation result version
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @Equals(1)
  @IsInt()
  @Default(1)
  version: 1

  /**
  * Create Solution from plain object
  * @param {unknown} plain - plain object
  * @returns {Solution}
  * @internal
  */
  static fromPlain = (plain: unknown): Solution => plainToClass(Solution, plain)
}
