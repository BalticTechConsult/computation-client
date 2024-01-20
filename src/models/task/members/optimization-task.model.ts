import { Equals, IsArray, IsDefined, ValidateNested, validateSync } from 'class-validator'
import { Expose, plainToClass, Type } from 'class-transformer'

import { Default } from '@/decorators'
import { ModelError } from '@/errors'
import { aTask } from '../task.abstract'
import { iMatrix, Matrix, iPriority, Priority, iSettings, Settings } from './children'
import { eTaskType } from './consts'


/**
* Optimization Task
*/
export interface iOptimizationTask extends aTask {
  /**
  * Task Type
  * @type {eTaskType.OPTIMIZATION_TASK}
  */
  taskType: eTaskType.OPTIMIZATION_TASK

  /**
  * Task version
  * @type {number}
  */
  version: 1

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
}

/**
* Optimization Task
*/
export class OptimizationTask extends aTask implements iOptimizationTask {
  /**
  * Task Type
  * @type {eTaskType.OPTIMIZATION_TASK}
  */
  @Expose()
  @Equals(eTaskType.OPTIMIZATION_TASK)
  @Default(eTaskType.OPTIMIZATION_TASK)
  taskType: eTaskType.OPTIMIZATION_TASK

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
  * Create OptimizationTask from plain object
  * @param {unknown} plain - plain object
  * @returns {OptimizationTask}
  * @internal
  */
  static fromPlain = (plain: AllowPrimitives<iOptimizationTask>): OptimizationTask =>
    plainToClass(OptimizationTask, plain)

  /**
  * Validate OptimizationTask
  * @param {OptimizationTask} input - OptimizationTask to validate
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
