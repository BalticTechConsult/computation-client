import { Equals, IsDefined, ValidateNested, validateSync } from 'class-validator'
import { Expose, plainToClass, Type } from 'class-transformer'

import { Default } from '@/decorators'
import { ModelError } from '@/errors'
import { AllowPrimitives } from '@/types'
import { aTask } from '../task.abstract'
import { iMatrix, iPoint, iPriority, iSettings, Matrix, Point, Priority, Settings } from './children'
import { eTaskType } from './consts'


/**
* Task
*/
export interface iPreciseTask extends aTask {
  /**
  * Task Type
  * @type {eTaskType.PRECISE_TASK}
  */
  taskType: eTaskType.PRECISE_TASK

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
  * Points
  * @type {iPoint[]}
  */
  points: iPoint[]
}

/**
* Task
*/
export class PreciseTask extends aTask implements iPreciseTask {
  /**
  * Task Type
  * @type {eTaskType.PRECISE_TASK}
  */
  @Expose()
  @Equals(eTaskType.PRECISE_TASK)
  @Default(eTaskType.PRECISE_TASK)
  taskType: eTaskType.PRECISE_TASK

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
  * Points
  * @type {Point[]}
  */
  @Expose()
  @IsDefined()
  @Type(() => Point)
  @ValidateNested({ each: true })
  points: Point[]

  /**
  * Create PreciseTask from plain object
  * @param {unknown} plain - plain object
  * @returns {PreciseTask}
  * @internal
  */
  static fromPlain = (plain: AllowPrimitives<iPreciseTask>): PreciseTask => plainToClass(PreciseTask, plain)

  /**
  * Validate PreciseTask
  * @param {PreciseTask} input - Task to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: PreciseTask): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      throw new ModelError('PreciseTask validation error!', errors)
    }

    return true
  }
}
