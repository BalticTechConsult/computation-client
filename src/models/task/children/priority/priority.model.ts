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
  @IsInt({ each: true })
  list: number[]
}
