import { Equals, IsArray, IsDefined, ValidateNested, validateSync } from 'class-validator'
import { Expose, plainToClass, Type } from 'class-transformer'

import { Default } from '@/decorators'
import { ModelError } from '@/errors'
import { iMatrix, Matrix } from '../matrix'
import { iPriority, Priority } from '../priority'
import { iSettings, Settings } from '../settings'


/**
* Optimization Task
*/
export interface iOptimizationTask {
  /**
  * Task settings
  * @type {iSettings}
  */
  settings: iSettings

  /**
  * Task matrix
  * @type {iMatrix}
  */
  matrix: iMatrix

  /**
  * Task priority
  * @type {iPriority}
  */
  priority: iPriority

  /**
  * Array of routes
  * @type {number[][]}
  */
  routes: number[][]

  /**
  * Task version
  * @type {number}
  */
  version: 1
}

/**
* Optimization Task
*/
export class OptimizationTask implements iOptimizationTask {
  /**
  * Task settings
  * @type {Settings}
  */
  @Expose()
  @IsDefined()
  @Type(() => Settings)
  @ValidateNested()
  settings: Settings

  /**
  * Task matrix
  * @type {Matrix}
  */
  @Expose()
  @IsDefined()
  @Type(() => Matrix)
  @ValidateNested()
  matrix: Matrix

  /**
  * Task priority
  * @type {Priority}
  */
  @Expose()
  @IsDefined()
  @Type(() => Priority)
  @ValidateNested()
  priority: Priority

  /**
  * Array of routes
  * @type {number[][]}
  */
  @Expose()
  @IsDefined()
  @IsArray()
  routes: number[][]

  /**
  * Task version
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @Equals(1)
  @Default(1)
  version: 1

  /**
  * Create OptimizationTask from plain object
  * @param {unknown} plain - plain object
  * @returns {Task}
  * @internal
  */
  static fromPlain = (plain: unknown): OptimizationTask => plainToClass(OptimizationTask, plain)

  /**
  * Validate OptimizationTask
  * @param {Task} input - OptimizationTask to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: OptimizationTask): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      throw new ModelError('OptimizationTask validation error!', errors)
    }

    return true
  }
}
