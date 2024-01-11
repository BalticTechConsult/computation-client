import { IsDefined, IsInt, validateSync } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'


/**
* Task priority settings
*/
export interface iPriority {
  /**
  * Priority list.
  * Negative values for low priority, positive for high priority.
  * Zero value - there is no priority.
  * @type {number[]}
  */
  list: number[]
}

/**
* Task priority settings
*/
export class Priority implements iPriority {
  /**
  * Priority list.
  * Negative values for low priority, positive for high priority.
  * Zero value - there is no priority.
  * @type {number[]}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  list: number[]

  /**
  * Create Priority from plain object
  * @param {unknown} plain - plain object
  * @returns {Priority}
  * @internal
  */
  static fromPlain = (plain: unknown): Priority => plainToClass(Priority, plain)

  /**
  * Validate Priority
  * @param {Priority} input - Priority to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: Priority): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      console.error(errors)

      throw new TypeError('Priority validation error!')
    }

    return true
  }
}
