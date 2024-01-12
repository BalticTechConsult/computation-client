import { Equals, IsDefined, ValidateNested, validateSync } from 'class-validator'
import { Expose, instanceToPlain, plainToClass, Type } from 'class-transformer'

import { Default } from '@/decorators'
import { iMatrix, iPriority, iSettings, Matrix, Priority, Settings } from './children'


/**
* Task
*/
export interface iTask {
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
  * Task version
  * @type {number}
  */
  version: 1
}

/**
* Task
*/
export class Task implements iTask {
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
  * Task version
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @Equals(1)
  @Default(1)
  version: 1

  /**
  * Create Task from plain object
  * @param {unknown} plain - plain object
  * @returns {Task}
  * @internal
  */
  static fromPlain = (plain: unknown): Task => plainToClass(Task, plain)

  /**
  * Validate Task
  * @param {Task} input - Settings to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: Task): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      console.error(errors)

      throw new TypeError('Settings validation error!')
    }

    return true
  }
}
